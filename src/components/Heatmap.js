import React from 'react';
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
    const day = date.getUTCDay();
    const hour = date.getUTCHours();
    heatmap[day === 7 ? 0 : day][hour].count += 1;
  });

  return heatmap;
};

export default function Heatmap() {
  const { subreddit } = useParams();
  const { subredditPosts, isLoading, hasError } = useFetchPosts(subreddit);

  if (hasError) return <ErrorDisplay />;
  if (isLoading) return <Spinner />;

  const heatmap = populateHeatmap(subredditPosts);
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
                key={days[index] + time}
                count={heatmap[index][time].count}
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

  &:hover {
    outline: 1px solid black;
    cursor: pointer;
  }
`;
