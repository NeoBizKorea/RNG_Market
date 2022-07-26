import React from "react";
import InputCom from "../Helpers/Inputs/InputCom/index";

export default function ProductUploadField({
  datas = {},
  cpt,
  inh,
  linkh,
  dscrphn,
  priceHndlr,
  roltsHndlr,
  keyHndlr,
  valueHndlr,
  unlckPrchesHndlr,
}) {
  return (
    <div className="w-full lg:pl-[41px]">
      <div className="fields w-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="field w-full mb-6">
            <h1 className="field-title">Item Name </h1>
            <div className="input-field mt-2">
              <InputCom
                type="text"
                name="name"
                placeholder="RaidParty Fighters"
                inputHandler={inh}
                value={datas.itemName}
              />
            </div>
          </div>
          <div className="field w-full mb-6">
            <h1 className="field-title">Description </h1>
            <div className="input-field mt-2">
              <div className="input-wrapper w-full ">
                <textarea
                  value={datas.description}
                  onChange={(e) => dscrphn(e)}
                  placeholder="provide a detailed description of your item."
                  rows="7"
                  className="w-full h-full px-7 py-4  border border-light-purple rounded-[20px] text-dark-gray bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* unlock purchase */}
        </form>
      </div>
    </div>
  );
}
