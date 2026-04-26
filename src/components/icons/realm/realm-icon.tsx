import type { Realm } from "@tasbox-org/docs";

interface RealmProps {
  realms: Realm[];
}

export const RealmIcon = (props: RealmProps) => (
  <svg
    viewBox="0 0 12.7 12.7"
    width="2rem"
    height="2rem"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-label={`Realms: ${props.realms.join(", ")}`}
  >
    <defs>
      <linearGradient
        id="linearGradient28"
        x1="6.35"
        x2="6.35"
        y1="4.7219"
        y2="13.805"
        gradientTransform="translate(16.787 -18.812)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#0bd840" offset=".52029" />
        <stop stop-color="#8cefa7" offset=".91916" />
      </linearGradient>
      <filter id="filter50-1" x="-.15143" y="-.26227" width="1.3029" height="1.5245" color-interpolation-filters="sRGB">
        <feFlood flood-color="rgb(136,247,92)" flood-opacity=".49412" result="flood" />
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="0.57309995" />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="SourceGraphic" in2="comp1" result="comp2" />
      </filter>
      <linearGradient
        id="linearGradient30"
        x1="7.0159"
        x2="11.511"
        y1="6.2438"
        y2="3.5427"
        gradientTransform="translate(-1.1494 5.3257)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#f6a32a" offset=".3882" />
        <stop stop-color="#f9b447" offset=".79814" />
      </linearGradient>
      <filter id="filter58-5" x="-.24" y="-.16" width="1.48" height="1.32" color-interpolation-filters="sRGB">
        <feFlood flood-color="rgb(247,191,92)" flood-opacity=".49412" result="flood" />
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="0.52443312" />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="SourceGraphic" in2="comp1" result="comp2" />
      </filter>
      <linearGradient
        id="linearGradient32"
        x1="5.7299"
        x2="1.1431"
        y1="6.1645"
        y2="3.622"
        gradientTransform="translate(11.028 -.75969)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#2f93ff" offset=".43564" />
        <stop stop-color="#53a7ff" offset=".82665" />
      </linearGradient>
      <filter id="filter62-6" x="-.24" y="-.16" width="1.48" height="1.32" color-interpolation-filters="sRGB">
        <feFlood flood-color="rgb(92,192,247)" flood-opacity=".49412" result="flood" />
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="0.52443312" />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="SourceGraphic" in2="comp1" result="comp2" />
      </filter>
    </defs>
    <g>
      <g transform="translate(-16.787 18.812)">
        <path
          d="m23.137-12.171-4.0874 2.3599a4.72 4.72 0 0 0 4.0874 2.3599 4.72 4.72 0 0 0 4.0874-2.3599z"
          fill="#709f7c"
          fill-opacity=".4"
        />
        <path
          id="menu"
          d="m23.137-12.171-4.5416 2.6222a5.2444 5.2444 0 0 0 4.5416 2.6222 5.2444 5.2444 0 0 0 4.5416-2.6222z"
          fill="url(#linearGradient28)"
          filter="url(#filter50-1)"
          style={{
            "mix-blend-mode": "normal",
            display: props.realms.some((realm) => realm === "menu") ? "initial" : "none",
          }}
        />
      </g>
      <g transform="translate(1.1494 -5.3257)">
        <path
          d="m5.492 6.8102v4.7199l4.0874 2.3599a4.72 4.72 0 0 0 0.63247-2.3599 4.72 4.72 0 0 0-4.7199-4.7199z"
          fill="#a6947a"
          fill-opacity=".4"
        />
        <path
          id="client"
          d="m5.492 6.2857v5.2443l4.5416 2.6222a5.2444 5.2444 0 0 0 0.70275-2.6222 5.2444 5.2444 0 0 0-5.2443-5.2443z"
          fill="url(#linearGradient30)"
          filter="url(#filter58-5)"
          style={{
            "mix-blend-mode": "normal",
            display: props.realms.some((realm) => realm === "client") ? "initial" : "none",
          }}
        />
      </g>
      <g transform="translate(-11.028 .75969)">
        <path
          d="m17.086 0.72474a4.72 4.72 0 0 0-4.7199 4.7199 4.72 4.72 0 0 0 0.63247 2.3599l4.0874-2.3599z"
          fill="#7b90a7"
          fill-opacity=".4"
        />
        <path
          id="server"
          d="m17.086 0.20031a5.2444 5.2444 0 0 0-5.2443 5.2443 5.2444 5.2444 0 0 0 0.70275 2.6222l4.5416-2.6222z"
          fill="url(#linearGradient32)"
          filter="url(#filter62-6)"
          style={{
            "mix-blend-mode": "normal",
            display: props.realms.some((realm) => realm === "server") ? "initial" : "none",
          }}
        />
      </g>
    </g>
  </svg>
);
