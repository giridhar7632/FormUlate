type ProviderProps = {
    id: string;
  }
  
export default function Provider({ id }: ProviderProps): JSX.Element {
    if (id === 'google') {
      return (
        <svg
          style={{ marginRight: '5px' }}
          width="24"
          height="24"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
            fill="white"
          />
          <path
            d="M128 76.3208C128 72.3962 127.649 68.6226 126.996 65H75V86.4088H104.712C103.432 93.327 99.5426 99.1887 93.6956 103.113V117H111.538C121.977 107.365 128 93.1761 128 76.3208Z"
            fill="#4285F4"
          />
          <path
            d="M74.834 130C89.5885 130 101.959 125.025 111 116.54L93.3393 102.601C88.4459 105.934 82.1864 107.904 74.834 107.904C60.6011 107.904 48.5541 98.1313 44.2569 85H26V99.3939C34.9918 117.551 53.4722 130 74.834 130Z"
            fill="#34A853"
          />
          <path
            d="M44 85.5769C42.9102 82.2368 42.291 78.669 42.291 75C42.291 71.331 42.9102 67.7632 44 64.4231V50H25.7957C21.9814 57.7574 19.9966 66.3189 20 75C20 83.9828 22.1053 92.4848 25.7957 100L44 85.5769Z"
            fill="#FBBC05"
          />
          <path
            d="M75.1786 42.096C83.2583 42.096 90.5125 44.899 96.2158 50.404L112 34.4697C102.469 25.5051 90.0122 20 75.1786 20C53.6661 20 35.0553 32.4495 26 50.6061L44.3857 65C48.7132 51.8687 60.8453 42.096 75.1786 42.096Z"
            fill="#EA4335"
          />
        </svg>
      )
    } else if (id === 'github') {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 151 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_611)">
            <rect x="0.0698242" width="150" height="150" rx="75" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M75.0698 0C33.6323 0 0.0698242 33.5625 0.0698242 75C0.0698242 108.188 21.5386 136.219 51.3511 146.156C55.1011 146.812 56.5073 144.562 56.5073 142.594C56.5073 140.812 56.4136 134.906 56.4136 128.625C37.5698 132.094 32.6948 124.031 31.1948 119.812C30.3511 117.656 26.6948 111 23.5073 109.219C20.8823 107.812 17.1323 104.344 23.4136 104.25C29.3198 104.156 33.5386 109.687 34.9448 111.937C41.6948 123.281 52.4761 120.094 56.7886 118.125C57.4448 113.25 59.4136 109.969 61.5698 108.094C44.8823 106.219 27.4448 99.75 27.4448 71.0625C27.4448 62.9062 30.3511 56.1562 35.1323 50.9062C34.3823 49.0312 31.7573 41.3438 35.8823 31.0312C35.8823 31.0312 42.1636 29.0625 56.5073 38.7188C62.5073 37.0312 68.8823 36.1875 75.2573 36.1875C81.6323 36.1875 88.0073 37.0312 94.0073 38.7188C108.351 28.9688 114.632 31.0312 114.632 31.0312C118.757 41.3438 116.132 49.0312 115.382 50.9062C120.164 56.1562 123.07 62.8125 123.07 71.0625C123.07 99.8438 105.539 106.219 88.8511 108.094C91.5698 110.438 93.9136 114.938 93.9136 121.969C93.9136 132 93.8198 140.062 93.8198 142.594C93.8198 144.562 95.2261 146.906 98.9761 146.156C128.601 136.219 150.07 108.094 150.07 75C150.07 33.5625 116.507 0 75.0698 0Z"
              fill="#1B1F23"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_611">
              <rect x="0.0698242" width="150" height="150" rx="75" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    } else {
      return <></>
    }
  }