import { IconTypes, IconPropsType } from "@/types/types";
import React from "react";

function GenerateIcon(data: IconTypes, props: IconPropsType): JSX.Element {
  return React.createElement(
    data.tag,
    { ...data.attr, ...props },
    data.child.map((item, index) =>
      React.createElement(item.tag, { ...item.attr, key: index }),
    ),
  );
}

export function ChevronLeft(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [{ tag: "polyline", attr: { points: "15 6 9 12 15 18" } }],
    },
    props,
  );
}

export function Pencil(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [
        {
          tag: "path",
          attr: { stroke: "none", d: "M0 0h24v24H0z" },
        },
        {
          tag: "path",
          attr: {
            d: "M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4",
          },
        },
        {
          tag: "line",
          attr: { x1: "13.5", y1: "6.5", x2: "17.5", y2: "10.5" },
        },
      ],
    },
    props,
  );
}

export function ChevronRight(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [{ tag: "polyline", attr: { points: "9 6 15 12 9 18" } }],
    },
    props,
  );
}

export function Logout(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [
        {
          tag: "path",
          attr: {
            d: "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M7 12h14l-3 -3m0 6l3 -3",
          },
        },
      ],
    },
    props,
  );
}

export function Sun(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [
        {
          tag: "path",
          attr: {
            stroke: "none",
            d: "M0 0h24v24H0z",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
          },
        },
      ],
    },
    props,
  );
}

export function Moon(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [
        {
          tag: "path",
          attr: {
            d: "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M19 11h2m-1 -1v2",
          },
        },
      ],
    },
    props,
  );
}

export function Kebab(props: IconPropsType) {
  return GenerateIcon(
    {
      tag: "svg",
      attr: {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      child: [
        {
          tag: "path",
          attr: {
            d: "M12 1.25C10.4812 1.25 9.25 2.48122 9.25 4C9.25 5.51878 10.4812 6.75 12 6.75C13.5188 6.75 14.75 5.51878 14.75 4C14.75 2.48122 13.5188 1.25 12 1.25ZM10.75 4C10.75 3.30964 11.3096 2.75 12 2.75C12.6904 2.75 13.25 3.30964 13.25 4C13.25 4.69036 12.6904 5.25 12 5.25C11.3096 5.25 10.75 4.69036 10.75 4Z",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M12 9.25C10.4812 9.25 9.25 10.4812 9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25ZM10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12Z",
          },
        },
        {
          tag: "path",
          attr: {
            d: "M12 17.25C10.4812 17.25 9.25 18.4812 9.25 20C9.25 21.5188 10.4812 22.75 12 22.75C13.5188 22.75 14.75 21.5188 14.75 20C14.75 18.4812 13.5188 17.25 12 17.25ZM10.75 20C10.75 19.3096 11.3096 18.75 12 18.75C12.6904 18.75 13.25 19.3096 13.25 20C13.25 20.6904 12.6904 21.25 12 21.25C11.3096 21.25 10.75 20.6904 10.75 20Z",
          },
        },
      ],
    },
    props,
  );
}
