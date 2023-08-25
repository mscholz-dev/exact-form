import React, { FC } from 'react';
import IconChevron from '../../public/icons/chevron.svg';

// interfaces
import { IPaging } from '../../utils/interfaces';

// types
import { TPagingArray } from '../../utils/types';

const Paging: FC<IPaging> = ({ max, current, setCurrent }) => {
  // function generate with chat gpt
  const paging = (max: number, current: number): Array<TPagingArray> => {
    const pageWindow = 2;
    let startPage = current - pageWindow;
    let endPage = current + pageWindow;

    if (startPage <= 0) {
      endPage -= startPage - 1;
      startPage = 1;
    }

    if (endPage > max) endPage = max;

    const array = [];
    for (let i = startPage - 1; i < endPage; i++) {
      array.push({
        id: i,
        number: i + 1,
        current: current === i + 1,
      });
    }

    return array;
  };

  const scrollTop = (): void =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  const handlePrevArrow = (): void => {
    if (1 === current) return;
    setCurrent(current - 1);
    scrollTop();
  };

  const handleNextArrow = (): void => {
    if (max === current) return;
    setCurrent(current + 1);
    scrollTop();
  };

  const handleNumber = (number: number): void => {
    setCurrent(number);
    scrollTop();
  };

  return (
    <>
      {max > 1 && (
        <div className="paging">
          <button
            className={`paging-arrow-prev${
              current === 1 ? ' paging-disabled' : ''
            }`}
            onClick={handlePrevArrow}
          >
            <IconChevron />
          </button>

          {paging(max, current).map(({ id, number, current }) => (
            <button
              key={id}
              className={`paging-item${current ? ' paging-current' : ''}`}
              onClick={() => handleNumber(number)}
            >
              {number}
            </button>
          ))}

          <button
            className={`paging-arrow-next${
              current === max ? ' paging-disabled' : ''
            }`}
            onClick={handleNextArrow}
            data-cy="paging-arrow-next"
          >
            <IconChevron />
          </button>
        </div>
      )}
    </>
  );
};

export default Paging;
