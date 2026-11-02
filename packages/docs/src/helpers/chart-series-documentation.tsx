import React from 'react';
import { Markdown } from '@storybook/addon-docs/blocks';
import chartingReadme from '../../../components/CHARTING_README.md?raw';

type ChartSeriesDocumentationSection =
  | 'Line series presets'
  | 'Bar series presets'
  | 'Gauge series presets'
  | 'Donut series presets'
  | 'Segment series presets';

const readmeLines = chartingReadme.split('\n');

function getSectionMarkdown(sectionTitle: ChartSeriesDocumentationSection): string {
  const startIndex = readmeLines.findIndex(line => {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    return heading?.[2] === sectionTitle;
  });

  if (startIndex === -1) {
    throw new Error(`Chart series documentation section not found: ${sectionTitle}`);
  }

  const startHeading = readmeLines[startIndex].match(/^(#{1,6})\s+/);
  const headingLevel = startHeading?.[1].length ?? 6;
  const endIndex = readmeLines.findIndex((line, index) => {
    if (index <= startIndex) {
      return false;
    }

    const heading = line.match(/^(#{1,6})\s+/);
    return heading !== null && heading[1].length <= headingLevel;
  });

  return readmeLines.slice(startIndex, endIndex === -1 ? undefined : endIndex).join('\n');
}

export function ChartSeriesDocumentation({ section }: { section: ChartSeriesDocumentationSection }) {
  return <Markdown>{getSectionMarkdown(section)}</Markdown>;
}
