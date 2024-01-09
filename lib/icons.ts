import { IconTypes, IconPropsType } from '@/types/types'
import React from 'react'

function GenerateIcon(data: IconTypes, props: IconPropsType): JSX.Element {
  return React.createElement(
    data.tag,
    { ...data.attr, ...props },
    data.child.map((item, index) =>
      React.createElement(item.tag, { ...item.attr, key: index })
    )
  )
}

export function ChevronLeft(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '15 6 9 12 15 18' } }],
    },
    props
  )
}

export function ChevronRight(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '9 6 15 12 9 18' } }],
    },
    props
  )
}

export function Logout(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M7 12h14l-3 -3m0 6l3 -3',
          },
        },
      ],
    },
    props
  )
}
