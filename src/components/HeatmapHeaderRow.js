import React from 'react';
import styled from 'styled-components';

const hours = [
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

function HeatmapHeaderRow() {
  return (
    <Container>
      {hours.map((hour) => (
        <Hour key={hour}>{hour}</Hour>
      ))}
    </Container>
  );
}

export default HeatmapHeaderRow;

const Container = styled.div`
  height: ${(props) => props.theme.size.heatmap.headerHeight}px;
  margin-left: ${(props) => props.theme.size.heatmap.dayWidth}px;
  display: flex;
  align-items: center;
  border: solid 1px ${(props) => props.theme.color.heatmap.headerBorder};
  background-image: ${(props) => props.theme.color.heatmap.headerBackground};
`;

const Hour = styled.div`
  width: ${(props) => props.theme.size.heatmap.hour * 2}px;
  text-align: center;
  color: ${(props) => props.theme.color.heatmap.headerHour};
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: 500;
`;
