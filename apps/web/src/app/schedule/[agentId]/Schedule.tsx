'use client';

import React from 'react';
import { SchedulePageProps } from './type';

export default function Schedule({ params }: SchedulePageProps) {
  return <div>params: {params.agentId}</div>;
}
