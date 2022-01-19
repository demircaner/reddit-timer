import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, func, number } from 'prop-types';
import { postType } from '../types';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// eslint-disable-next-line object-curly-newline
function HeatmapRow({ day, postsPerHour, onClickHour, selectedHour }) {
  return (
    <Container>
      <Weekday>{weekdays[day]}</Weekday>

      {postsPerHour.map((posts, hour) => (
        <Hour
          // eslint-disable-next-line react/no-array-index-key
          key={hour}
          numPosts={posts.length}
          onClick={() => onClickHour({ day, hour })}
          selected={hour === selectedHour}
          type="button"
        >
          {posts.length}
        </Hour>
      ))}
    </Container>
  );
}

HeatmapRow.propTypes = {
  day: number.isRequired,
  postsPerHour: arrayOf(arrayOf(postType)).isRequired,
  onClickHour: func.isRequired,
  selectedHour: number,
};

HeatmapRow.defaultProps = {
  selectedHour: null,
};

export default HeatmapRow;

const getBackgroundColor = ({ numPosts, theme }) => {
  const backgroundColors = theme.color.heatmap.hourBackground;

  if (numPosts >= backgroundColors.length) {
    return backgroundColors[backgroundColors.length - 1];
  }

  return backgroundColors[numPosts];
};

const Container = styled.div`
  display: flex;
`;

const Weekday = styled.div`
  width: ${(props) => props.theme.size.heatmap.dayWidth}px;
  height: ${(props) => props.theme.size.heatmap.hour}px;
  line-height: ${(props) => props.theme.size.heatmap.hour}px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.color.light};
  background-color: ${(props) => props.theme.color.heatmap.dayBackground};
`;

const highlighted = css`
  border: solid 1px ${(props) => props.theme.color.heatmap.hourHoverBorder};
  line-height: ${(props) => props.theme.size.heatmap.hour - 2}px;
`;

const Hour = styled.button`
  width: ${(props) => props.theme.size.heatmap.hour}px;
  height: ${(props) => props.theme.size.heatmap.hour}px;
  line-height: ${(props) => props.theme.size.heatmap.hour}px;
  text-align: center;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: 600;
  color: ${(props) => props.theme.color.light};
  background-color: ${(props) => getBackgroundColor(props)};
  cursor: pointer;
  border: none;
  border-radius: 0;

  ${(props) => props.selected && highlighted}

  :hover, :focus {
    outline: none;
    ${highlighted}
  }
`;
