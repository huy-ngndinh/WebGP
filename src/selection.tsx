import { useContext, useState, Dispatch, SetStateAction } from "react";
import { circuits_list } from "./circuits_list";
import { user_context } from "./user_context";
import { User } from "./user_context";
import { useNavigate } from "react-router-dom";

export default function Selection() {
  const { user_info, set_user_info }: { user_info: User; set_user_info: Dispatch<SetStateAction<User>> } = useContext(user_context);

  const [circuit_index, set_circuit_index] = useState(-1);
  const [popup_open, set_popup_open] = useState(false);
  const [cooldown, set_cooldown] = useState(false);

  const navigate = useNavigate();

  const onClick = (index: number) => {
    if (cooldown) return;
    set_circuit_index(index);
    set_popup_open(true);
  };

  const on_click_popup = () => {
    set_popup_open(false);
    // allow `title`, `description` and `source` to persist a little longer after popup has closed
    set_cooldown(true);
    setTimeout(() => {
      set_circuit_index(-1);
      set_cooldown(false);
    }, 500);
  };

  const on_click_start = () => {
    set_user_info((current_user) => {
      current_user.circuit_index = circuit_index;
      return current_user;
    });
    navigate("/circuit");
  };

  return (
    <div id="background" className="fixed size-full grid grid-rows-10 grid-cols-10 bg-white/80 bg-[url('./assets/images/background.jpg')] bg-center bg-[length:60%_60%] bg-repeat bg-blend-lighten">
      <div id="title-container" className="row-start-1 row-end-2 col-start-1 col-end-11 border-b-2 border-black flex justify-center items-center">
        <div id="title" className={`w-1/6 h-full flex justify-center items-center font-description text-5xl tracking-wider ${!popup_open ? "text-black" : "text-transparent"} transition-colors ease-in-out duration-500`}>
          Circuits
        </div>
      </div>
      <div id="circuits-container" className="row-start-2 row-end-11 col-start-1 col-end-11 p-6 grid grid-cols-5 gap-6 overflow-scroll">
        {circuits_list.map((circuit, index) => {
          return (
            <button key={index} id="circuit-container" className="relative h-auto w-full aspect-square rounded-xl hover:scale-105 transition ease-in-out" onClick={() => onClick(index)}>
              <div id="circuit-image-container" className="h-3/4 w-full rounded-t-xl">
                <img id="circuit-image" src={require(`./assets/images/circuits_image/${circuit.path}.avif`)} alt="Formula 1 circuit" className="size-full bg-contain rounded-t-xl border-t-2 border-t-black border-l-2 border-l-black border-r-2 border-r-black" />
              </div>
              <div id="circuit-title-container" className="h-1/4 w-full rounded-b-xl p-4 border-2 border-black flex justify-center items-center font-mono font-bold text-md text-pretty">
                {circuit.name.split("-")[1]}
              </div>
            </button>
          );
        })}
      </div>
      <div id="blur" className={`absolute size-full ${!popup_open ? "bg-[#686D76]/0 pointer-events-none" : "bg-[#686D76]/60"} transition-colors ease-in-out duration-500`} onClick={() => on_click_popup()}>
        <div id="pop-up-container" className={`absolute h-5/6 w-3/4 left-1/2 top-1/2 -translate-x-1/2 ${!popup_open ? "-translate-y-full opacity-0 pointer-events-none" : "-translate-y-1/2 opacity-100"} rounded-lg grid grid-rows-8 grid-cols-5 transition-all ease-in-out duration-500 bg-red-200`}>
          <div id="circuit-title" className="row-start-1 col-start-1 col-end-6 rounded-t-lg flex justify-center items-center font-description text-4xl tracking-wide bg-green-200">
            {circuit_index !== -1 ? circuits_list[circuit_index].name : ""}
          </div>
          <div id="circuit-description" className="row-start-2 row-end-9 col-start-1 col-end-6 rounded-b-lg flex flex-col justify-center items-center gap-6 bg-[#FEFAF6]">
            <blockquote id="quote" cite={popup_open ? circuits_list[circuit_index].source : ""} className="rounded-md ml-4 mr-4 p-4 font-mono font-medium text-xl tracking-wide leading-9 bg-[#E5E1DA]">
              {circuit_index !== -1 ? circuits_list[circuit_index].description : ""}
            </blockquote>
            <footer id="footer" className="w-full pr-4 flex justify-end font-mono italic text-lg">
              {circuit_index !== -1 ? `-- ${circuits_list[circuit_index].source}` : ""}
            </footer>
            <button id="start-button" className="h-[10%] w-full font-description italic text-3xl tracking-widest bg-red-200" onClick={() => on_click_start()}>
              START
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
