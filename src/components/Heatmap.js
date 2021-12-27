/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, number, shape } from 'prop-types';
import HeatmapHeaderRow from './HeatmapHeaderRow';
import HeatmapRow from './HeatmapRow';

function Heatmap({ postsPerDay, onClickHour, selectedDayAndHour }) {
  return (
    <>
      <Container data-testid="heatmap">
        <HeatmapHeaderRow />

        {postsPerDay.map((postsPerHour, day) => (
          <HeatmapRow
            // eslint-disable-next-line react/no-array-index-key
            key={day}
            day={day}
            postsPerHour={postsPerHour}
            onClickHour={onClickHour}
            selectedHour={
              selectedDayAndHour.day === day ? selectedDayAndHour.hour : null
            }
          />
        ))}
      </Container>

      <TimezoneWrapper>
        All times are shown in your timezone:{' '}
        <Timezone>{Intl.DateTimeFormat().resolvedOptions().timeZone}</Timezone>
      </TimezoneWrapper>
    </>
  );
}

Heatmap.propTypes = {
  postsPerDay: arrayOf(arrayOf(number)).isRequired,
  onClickHour: func.isRequired,
  selectedDayAndHour: shape({
    day: number,
    hour: number,
  }).isRequired,
};

export default Heatmap;

const Container = styled.div`
  width: ${(props) => props.theme.size.heatmap.width}px;
  margin: auto;
`;

const TimezoneWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: ${(props) => props.theme.font.size.small};
  text-align: center;
`;

const Timezone = styled.span`
  font-weight: 600;
`;
