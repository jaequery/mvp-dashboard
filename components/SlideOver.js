import { Transition } from '@headlessui/react';
import { useState } from 'react';

export const SlideOver = ({
  show = false,
  title = 'Add New',
  description,
  onClose,
  children,
}) => {
  return (
    <>
      <div>
        {show && (
          <div className="z-50 fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <section
                className="absolute inset-y-0 pl-16 max-w-full right-0 flex"
                aria-labelledby="slide-over-heading"
              >
                <Transition
                  show={show}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md h-full">
                    <form className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                      <div className="flex-1 h-0 overflow-y-auto">
                        <div className="py-6 px-4 bg-cyan-700 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h2
                              id="slide-over-heading"
                              className="text-lg font-medium text-white"
                            >
                              {title}
                            </h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button
                                onClick={onClose}
                                className="bg-cyan-700 rounded-md text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              >
                                <span className="sr-only">Close panel</span>
                                {/* Heroicon name: x */}
                                <svg
                                  className="h-6 w-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          {children}
                        </div>
                      </div>
                      <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </Transition>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
