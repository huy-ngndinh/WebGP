import { useState, useEffect, useRef } from "react";
import { circuits_list } from "./circuits_list";
import { useNavigate } from "react-router-dom";

// https://stackoverflow.com/questions/5927284/how-can-i-make-setinterval-also-work-when-a-tab-is-inactive-in-chrome
class WorkerInterval {
  worker: any = null;
  constructor(callback: () => void, interval: number) {
    const blob = new Blob([`setInterval(() => postMessage(0), ${interval});`]);
    const workerScript = URL.createObjectURL(blob);
    this.worker = new Worker(workerScript);
    this.worker.onmessage = callback;
  }

  stop() {
    this.worker.terminate();
  }
}

export default function Homepage() {
  const [current_circuit_index, set_current_circuit_index] = useState(0);
  const [current_circuit_title, set_current_circuit_title] = useState<String>(circuits_list[0].name);
  const [current_circuit_path, set_current_circuit_path] = useState(circuits_list[0].path);
  const title_first_render = useRef(true);
  const navigate = useNavigate();

  // remove title's characters
  useEffect(() => {
    // disable first render
    if (title_first_render.current) {
      title_first_render.current = false;
      return;
    }

    const interval = new WorkerInterval(() => {
      set_current_circuit_title((title) => {
        if (title.length === 0) {
          interval.stop();
          return title;
        } else {
          return title.slice(0, -1);
        }
      });
    }, 50);
  }, [current_circuit_index]);

  // add title's characters
  useEffect(() => {
    // only render when the title is empty
    if (current_circuit_title.length !== 0) {
      return;
    }

    const text = circuits_list[current_circuit_index].name.split("");
    var current_text_index = 0;
    const interval = new WorkerInterval(() => {
      set_current_circuit_title((title) => {
        title += text[current_text_index];
        if (current_text_index + 1 < text.length) {
          current_text_index += 1;
        } else {
          interval.stop();
        }
        return title;
      });
    }, 50);

    set_current_circuit_path(circuits_list[current_circuit_index].path);
  }, [current_circuit_title]);

  // alternate circuits indefinitely
  useEffect(() => {
    const interval = setInterval(() => {
      set_current_circuit_index((index) => {
        index = (index + 1) % circuits_list.length;
        return index;
      });
    }, 7000);

    return () => clearInterval(interval);
  });

  return (
    <div id="background" className="fixed size-full grid grid-rows-10 grid-cols-10 bg-white/80 bg-[url('./assets/images/background.jpg')] bg-center bg-[length:60%_60%] bg-repeat bg-blend-lighten">
      {/* <div id="navigation-bar-container" className="row-start-1 row-end-2 col-start-1 col-end-11 bg-yellow-100"></div> */}
      <div id="text-container" className="row-start-2 row-end-10 col-start-1 col-end-6 grid grid-rows-5 grid-cols-6 gap-2">
        <div id="headline-container" className="row-start-2 row-end-3 col-start-1 col-end-7 flex justify-center items-center">
          <svg id="headline" className="h-auto w-4/5" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 459">
            <defs>
              <mask id="mask" x="1059.88" y="47.65" width="317.93" height="309.4" maskUnits="userSpaceOnUse">
                <rect x="1257.71" y="108.07" width="60.43" height="60.43" fill="#333" />
                <rect x="1257.71" y="168.5" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1257.71" y="228.92" width="60.43" height="60.43" fill="#333" />
                <rect x="1257.71" y="47.65" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1197.28" y="228.92" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1197.28" y="47.65" width="60.43" height="60.43" fill="#333" />
                <rect x="1197.28" y="168.5" width="60.43" height="60.43" fill="#333" />
                <rect x="1136.86" y="228.92" width="60.43" height="60.43" fill="#333" />
                <rect x="1197.28" y="108.07" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1136.86" y="47.65" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1136.86" y="168.5" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1136.86" y="108.07" width="60.43" height="60.43" fill="#333" />
                <rect x="1318.14" y="108.07" width="59.67" height="60.43" fill="#e6e6e6" />
                <rect x="1197.28" y="289.35" width="60.43" height="59.67" fill="#333" />
                <rect x="1318.14" y="289.35" width="59.67" height="59.67" fill="#333" />
                <rect x="1257.71" y="289.35" width="60.43" height="59.67" fill="#e6e6e6" />
                <rect x="1318.14" y="228.92" width="59.67" height="60.43" fill="#e6e6e6" />
                <rect x="1318.14" y="168.5" width="59.67" height="60.43" fill="#333" />
                <rect x="1318.14" y="47.65" width="59.67" height="60.43" fill="#333" />
                <rect x="1076.43" y="47.65" width="60.43" height="60.43" fill="#333" />
                <rect x="1076.43" y="168.5" width="60.43" height="60.43" fill="#333" />
                <rect x="1136.86" y="289.35" width="60.43" height="59.67" fill="#e6e6e6" />
                <rect x="1076.43" y="108.07" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1076.43" y="228.92" width="60.43" height="60.43" fill="#e6e6e6" />
                <rect x="1076.43" y="289.35" width="60.43" height="59.67" fill="#333" />
              </mask>
            </defs>
            <text transform="translate(-779.69 -42.48)" fontSize="326.44" stroke="#000" strokeMiterlimit="10" strokeWidth="5" fontFamily="Crotahfreeversion-Italic, Crotah free version" fontStyle="italic" letterSpacing="-0.06em">
              W
              <tspan x="339.5" y="0" letterSpacing="0.07em">
                e
              </tspan>
              <tspan x="570.95" y="0" letterSpacing="0.08em">
                bG
              </tspan>
              <tspan x="1050.16" y="0" letterSpacing="0.07em">
                P
              </tspan>
            </text>
            <path d="M69.16,150.84v-.93L71.63,116H129.3l-1.85,1.85L49.73,178.9ZM67,177.36l54.28-43.18,4-2.77,1.54-1.54L158,105.5l-28.07,37-11.1,129.21L172.16,116h57.05l1.24,117.8,34.84-98.07L271.77,116h60.14l-12.34,41.63q-3.39,10.8-7.86,24.67t-10,31.46l21-8-29,22.51-115,91,3.7-69.38q-1.84,4-5.55,13.26t-7.56,19.12q-3.85,9.87-7.09,18.19T158,310.89l-35.47,21.28H55Zm91,170.23,120.27-95v-.31l14.8-11.41q-3.41,10.19-6.63,20.51t-6.63,20.51q-.93,2.48-2.16,6.48c-.82,2.67-1.75,5.45-2.78,8.32s-2,5.61-2.93,8.17a53.94,53.94,0,0,1-2.31,5.71l-25.9,21.89H198.38Z" stroke="#000" strokeMiterlimit="10" strokeWidth="5" />
            <path d="M365.83,257.23l10.48-53.66,41-37h96.83l-66.3,44.1h-.62l-.31.62L345.47,278.51Zm-4.32,22.82L438,229.17l-.93,4.31H482.4l4.31-22.82h-21l89.43-59.52L533,171.81l21.9,21.27-7.71,40.09.61.31L505.83,260h-73.7l-5.55,28.38h46.26l66-29.61-87.58,58.59-23.13,15.11-19.43,13.27,11.1-13.27H393l-34.84-34.53Zm170.84-4.63,17.58-12-11.1,12.33L528,332.47H446Z" stroke="#000" strokeMiterlimit="10" strokeWidth="5" />
            <path d="M623.64,203l81.41-55.51L693.64,165H743l25.6.31,34.84,19.43-13.57,68.77L635.35,355.91l24.37-23.44H598.66Zm-23.44,2.16,28.68-29,11.72-61.06h64.45l-4.63,23.44Zm71.23,84.19h48.73l15.73-83H687.47Zm17,43.17,138.15-91.89q-8,5.55-12,8.17t-5.4,3.7q-1.39,1.08-1.23,1.08h.46q1.23,0-2.16,3.39t-8,7.71q-5.25,4.94-12.33,11.1-1.54,8-2.78,14.5-1.23,5.24-2,9.86a36.34,36.34,0,0,1-1.08,5.25l-40.4,27.13Z" stroke="#000" strokeMiterlimit="10" strokeWidth="5" />
            <path d="M857.7,206.34l157.89-104.85-14.18,14.81h17.88l25.91,28.06-9.56,47.18H972.73l5.86-30.84H938.8L914.13,288.38H940l-65.38,43.48h-.31l-.61.31-33.93-33.31ZM842,204.8l20.36-21.28,6.16-32.68,4.32-3.09h.62L920,116.3h55.2l-89.12,59.51-4.32,2.47-21.28,14.5Zm49.34,127.67,138.16-91.89-4,7.4q-2.78,15.11-5.24,27.44c-.62,3.29-1.23,6.63-1.85,10s-1.19,6.42-1.7,9.09-1,4.89-1.39,6.63a29.33,29.33,0,0,0-.61,2.93L971.8,332.47H914.44l-46.87,16Zm61.37-119h79.26l-.93,5.86,38.86-17.58-30.53,20.66L1019,235.64l-10.18,7.09h-.31l-52.73,34.85,4.62-23.74h-16Z" stroke="#000" strokeMiterlimit="10" strokeWidth="5" />
            <g mask="url(#mask)">
              <path d="M1101,312.12l14.5-75.86-33.62,13.57,117.81-78-6.48,35.77h41.32l8.64-47.18h-26.52l64.45-42.87,28.37,25.9-8.32,44.72,15.11-4.93-22.21,15.72-51.19,34.23-.92.31-21,14.19h-34.23l-2.16,11.72q-1.56,7.1-2.78,14.18l-11.72,8h-.31l-96.21,64.15Zm10.49,20.35,49-32.68v-.31l17.27-11.1.93-.93h.31l.3-.31h.31L1206.79,269l-29.61,30.53-3.39,16.34-24.67,16.65ZM1138.64,116h104.54l54.89-21.9L1120.13,212.51Zm100.22,131.68,58.29-38.86-2.78,13.57-29.6,20.05-.93.3-7.09,4.94Z" stroke="#000" strokeMiterlimit="10" strokeWidth="5" />
            </g>
          </svg>
        </div>
        <div id="sub-headline" className="row-start-3 row-end-4 col-start-1 col-end-7 flex justify-center items-center font-description text-5xl tracking-wider">
          A&#160;
          <span id="highlighted-text" className="text-[#C40C0C]">
            F1
          </span>
          -inspired racing game
        </div>
        <div id="start-button-container" className="relative row-start-4 row-end-5 col-start-2 col-end-4 flex justify-center items-center">
          <div id="start-button-shadow" className="absolute h-3/5 w-5/6 border-2 border-black" />
          <button
            id="start-button"
            className="
              absolute h-3/5 w-5/6 border-2 border-black font-description text-3xl tracking-wider hover:-translate-x-1 hover:-translate-y-1 ease-in-out duration-100 
              hover:bg-black hover:text-white 
              hover:after:absolute hover:after:h-[110%] hover:after:w-[105%] hover:after:top-0 hover:after:left-0"
            onClick={() => navigate("/selection")}
          >
            Start
          </button>
        </div>
        <div id="visit-button-container" className="relative row-start-4 row-end-5 col-start-4 col-end-6 flex justify-center items-center">
          <div id="visit-button-shadow" className="absolute h-3/5 w-5/6 border-2 border-black" />
          <button
            id="visit-button"
            className="
              absolute h-3/5 w-5/6 border-2 border-black font-description text-3xl tracking-wider hover:-translate-x-1 hover:-translate-y-1 ease-in-out duration-100 
              hover:bg-black hover:text-white 
              hover:after:absolute hover:after:h-[110%] hover:after:w-[105%] hover:after:top-0 hover:after:left-0"
            onClick={() => window.open("https://github.com/huy-ngndinh/WebGP")}
          >
            Github
          </button>
        </div>
      </div>
      <div id="illustration-container" className="row-start-2 row-end-10 col-start-6 col-end-11 flex flex-col justify-center items-center">
        <div id="illustration-title" className="h-1/6 w-full flex justify-center items-center font-description text-4xl">
          {current_circuit_title}
        </div>
        {/* https://stackoverflow.com/questions/34582405/react-wont-load-local-images */}
        <img id="illustration" src={require(`./assets/images/circuits_layout/${current_circuit_path}.avif`)} alt="Formula 1 circuit" />
      </div>
      {/* <div id="footer-container" className="row-start-10 row-end-11 col-start-1 col-end-11 bg-pink-200"></div> */}
    </div>
  );
}
