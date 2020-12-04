import DashboardLayout from '../components/layouts/DashboardLayout';
export default function SettingsPage() {
  return (
    <DashboardLayout>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        My Settings
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>

                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        {/* <select class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                          <option>filter by status</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select> */}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                {/* <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Add New +
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-64">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                <a
                  href="#"
                  className="group bg-gray-50 rounded-md px-3 py-2 flex items-center text-sm font-medium text-cyan-700 hover:text-cyan-700 hover:bg-white"
                  aria-current="page"
                >
                  {/* Heroicon name: user-circle */}
                  <svg
                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-cyan-500 group-hover:text-cyan-500"
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="truncate">Settings</span>
                </a>
              </nav>
            </aside>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Notifications
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Provide basic informtion about the job. Be specific with
                        the job title.
                      </p>
                    </div>
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">
                        By Email
                      </legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="h-5 flex items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="comments"
                              className="font-medium text-gray-700"
                            >
                              Comments
                            </label>
                            <p className="text-gray-500">
                              Get notified when someones posts a comment on a
                              posting.
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start">
                            <div className="h-5 flex items-center">
                              <input
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="candidates"
                                className="font-medium text-gray-700"
                              >
                                Candidates
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate applies for a job.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start">
                            <div className="h-5 flex items-center">
                              <input
                                id="offers"
                                name="offers"
                                type="checkbox"
                                className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="offers"
                                className="font-medium text-gray-700"
                              >
                                Offers
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate accepts or rejects
                                an offer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="mt-6">
                      <legend className="text-base font-medium text-gray-900">
                        Push Notifications
                      </legend>
                      <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push_everything"
                            name="push_notifications"
                            type="radio"
                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                          />
                          <label htmlFor="push_everything" className="ml-3">
                            <span className="block text-sm font-medium text-gray-700">
                              Everything
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push_email"
                            name="push_notifications"
                            type="radio"
                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                          />
                          <label htmlFor="push_email" className="ml-3">
                            <span className="block text-sm font-medium text-gray-700">
                              Same as email
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push_nothing"
                            name="push_notifications"
                            type="radio"
                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                          />
                          <label htmlFor="push_nothing" className="ml-3">
                            <span className="block text-sm font-medium text-gray-700">
                              No push notifications
                            </span>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
