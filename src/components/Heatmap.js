import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetchPosts from '../hooks/useFetchPosts';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';

const times = [
  '12:00am',
  '2:00am',
  '4:00am',
  '6:00am',
  '8:00am',
  '10:00am',
  '12:00pm',
  '2:00pm',
  '4:00pm',
  '6:00pm',
  '8:00pm',
  '10:00pm',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const populateHeatmap = (posts) => {
  const timestamps = posts.map((post) => post.data.created_utc);
  const heatmap = {};

  for (let i = 0; i < days.length; i += 1) {
    heatmap[i] = {};
    for (let j = 0; j < 24; j += 1) {
      heatmap[i][j] = {
        count: 0,
        selected: false,
      };
    }
  }

  timestamps.forEach((time) => {
    // Without multiplication with 1000 will get a value in 1970
    const date = new Date(time * 1000);
    const day = date.getDay();
    const hour = date.getHours();
    heatmap[day === 7 ? 0 : day][hour].count += 1;
  });

  return heatmap;
};

export default function Heatmap() {
  const { subreddit } = useParams();
  const { subredditPosts, isLoading, hasError } = useFetchPosts(subreddit);

  // eslint-disable-next-line no-unused-vars
  const [heatmap, setHeatmap] = useState();
  const [selectedBox, setSelectedBox] = useState([-1, -1]);

  useEffect(() => {
    setHeatmap(populateHeatmap(subredditPosts));
  }, [subredditPosts]);

  const handleClick = (i, j) => {
    const newHeatmap = { ...heatmap };
    const prevSelectedBox = [...selectedBox];
    if (prevSelectedBox[0] >= 0) {
      newHeatmap[prevSelectedBox[0]][prevSelectedBox[1]].selected = false;
    }
    newHeatmap[i][j].selected = true;

    setSelectedBox([i, j]);
    setHeatmap(newHeatmap);
  };

  if (hasError) return <ErrorDisplay />;
  if (isLoading) return <Spinner />;

  return (
    <table>
      <thead>
        <tr>
          <EmptyColumn>&nbsp;</EmptyColumn>
          {times.map((time) => (
            <Time key={time}>{time}</Time>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, index) => (
          <tr key={day}>
            <Day>{day}</Day>
            {Object.keys(heatmap[index]).map((time) => (
              <Square
                role="gridcell"
                key={days[index] + time}
                count={heatmap[index][time].count}
                selected={heatmap[index][time].selected}
                onClick={() => handleClick(index, time)}
              >
                {heatmap[index][time].count}
              </Square>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const EmptyColumn = styled.th.attrs({ colSpan: '2' })``;

const Time = styled.th.attrs({ colSpan: '2' })`
  background: ${(props) => props.theme.color.tableTime};
  padding: 18px 8px 18px 8px;
`;

const Day = styled.td.attrs({ colSpan: '2' })`
  background: ${(props) => props.theme.color.tableDay};
  color: ${(props) => props.theme.color.light};
  padding: 6.5px 32px;
  height: 40px;
  text-align: center;
`;

const Square = styled.td`
  width: 40px;
  height: 40px;
  text-align: center;
  background: ${(props) => {
    const colorIndex = props.count >= 10 ? 10 : props.count;
    return props.theme.color.heatmapColors[colorIndex];
  }};
  color: ${(props) => props.theme.color.light};
  outline: ${(props) => (props.selected ? '1px solid black' : 'none')};

  &:hover {
    outline: 1px solid black;
    cursor: pointer;
  }
`;
