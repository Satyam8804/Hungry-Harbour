import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const Filter = ({ isOpen, onClose, children, filter }) => {
  const [filterName, setFilterName] = useState(null);
  const [subLabel, setSubLabel] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    const { facetInfo, subLabel } = filter?.[id] ?? {};
    setSubLabel(subLabel);
    setFilterName(facetInfo);
  }, [id, filter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-[80%] h-[400px] md:w-1/2 overflow-hidden">
        <div className="flex justify-between border-b-2 ">
          <span className="text-2xl font-bold m-4">Filter</span>
          <button className="p-1 rounded-2xl shadow-md h-6 m-4" onClick={onClose}>
            <RxCross2 />
          </button>
        </div>
        <div className="w-full flex overflow-y-scroll">
          <div className="w-4/12 border-r-2 h-full border-black-300 flex flex-col py-2 z-10">
            {filter &&
              filter.map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setId(idx);
                  }}
                  className={`font-bold text-gray-700 text-md cursor-pointer px-4 py-3 ${
                    idx === id ? 'border-orange-500 border-l-4' : ''
                  }`}
                >
                  {item.label}
                </span>
              ))}
          </div>
          <div className="w-8/12 p-4 overflow-y-scroll h-full scroll cursor-grab" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <span>{subLabel ?? ''}</span>
            <div className="flex flex-col gap-2">
              {filterName &&
                filterName?.map((item, idx) => (
                  <label htmlFor={item?.id}>
                    <input type="checkbox" name="" id={item?.id} key={idx} value={item.label} />
                    {' '}
                    {item?.label}
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
