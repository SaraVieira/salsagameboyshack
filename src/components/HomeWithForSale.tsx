import { GB } from "../App";
import CustomCarousel from "./Slider";

export const HomeWithForSale = ({ gbs }: { gbs: GB[] }) => {
  return (
    <>
      <h1 className="text-xl mt-8 text-center">Current Gameboys for auction</h1>
      <small className="text-gray-400 text-center w-full block mb-6">
        These units only ship to the UK.
      </small>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {gbs.map((gb) => (
          <div
            key={gb.url}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-[#4b156b]"
          >
            <CustomCarousel>
              {[...new Set(gb.images)].map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={gb.title}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full shrink-0"
                />
              ))}
            </CustomCarousel>

            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-100">
                <a href={gb.url}>{gb.title}</a>
              </h3>
              <p className="text-sm text-gray-300">{gb.description}</p>
              <div className="flex flex-1 flex-col justify-end">
                <p className="text-base font-bold text-gray-100 mt-4">
                  Current Bid £{gb.currentPrice}
                </p>
                <p className="text-sm italic text-gray-300">
                  {gb.bids} bids and {gb.ends.toLocaleLowerCase()}
                </p>
              </div>
            </div>
            <a
              className="bid-button text-white text-xl font-bold py-4 text-center"
              href={gb.url}
              target="_blank"
            >
              Bid
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
