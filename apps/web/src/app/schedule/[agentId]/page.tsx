import React from 'react';
import Schedule from './Schedule';
import { SchedulePageProps } from './type';

export default function SchedulePage({ params }: SchedulePageProps) {
  return <Schedule params={params} />;
}
