import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import { Modal } from '../../components/Modal';
import { api } from '../../hooks/api.hooks';

export default function UserPage() {
  const router = useRouter();

  const [modal, setModal] = useState({
    show: false,
    title: 'Saved!',
    description: 'You have saved successfully',
    buttonText: 'Ok',
  });
  const [saveUser, saveUserRes] = api('patch', `/users/${router.query.id}`);
  const userRes = api('get', `/users/${router.query.id}`);

  useEffect(() => {
    if (!saveUserRes.isLoading && saveUserRes.data) {
      modal.show = true;
      modal.title = 'Success';
      setModal(modal);
    }
  }, [saveUserRes.data, saveUserRes.isLoading]);
  return (
    <DashboardLayout>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        {/* Page header */}
        {userRes.isLoading && <h3>Is loading</h3>}
        {!userRes.isLoading && userRes.data.id && (
          <Formik
            initialValues={{
              firstName: userRes.data.firstName || '',
              lastName: userRes.data.lastName || '',
              email: userRes.data.email || '',
              street1: userRes.data.street1 || '',
              street2: userRes.data.street2 || '',
              city: userRes.data.city || '',
              state: userRes.data.state || '',
              zip: userRes.data.zip || '',
              country: userRes.data.country || '',
            }}
            onSubmit={(values) => {
              saveUser(values);
            }}
          >
            {({ getFieldProps, handleSubmit, touched, errors }) => {
              return (
                <form
                  className="space-y-6"
                  method="POST"
                  onSubmit={handleSubmit}
                  noValidate
                >
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
                                  Editing User #{router.query.id}
                                </h1>
                              </div>
                              <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                <dt className="sr-only">Company</dt>

                                <dt className="sr-only">Account status</dt>
                                <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize"></dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                            Save
                          </button>
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
                            <span className="truncate">Account</span>
                          </a>
                          <a
                            href="#"
                            className="group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {/* Heroicon name: key */}
                            <svg
                              className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                              />
                            </svg>
                            <span className="truncate">Password</span>
                          </a>
                          <a
                            href="#"
                            className="group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {/* Heroicon name: credit-card */}
                            <svg
                              className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                            <span className="truncate">Plan &amp; Billing</span>
                          </a>
                          <a
                            href="#"
                            className="group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {/* Heroicon name: user-group */}
                            <svg
                              className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="truncate">Team</span>
                          </a>
                          <a
                            href="#"
                            className="group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {/* Heroicon name: view-grid-add */}
                            <svg
                              className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="truncate">Integrations</span>
                          </a>
                        </nav>
                      </aside>
                      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Profile
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so
                                be careful what you share.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="company_website"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email
                                </label>
                                <div className="mt-1 rounded-md shadow-sm flex">
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    {...getFieldProps('email')}
                                    autoComplete="email"
                                    className="focus:ring-cyan-500 focus:border-cyan-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  />
                                </div>
                              </div>

                              <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700">
                                  Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                  <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                                    <svg
                                      className="h-full w-full text-gray-300"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                  </span>
                                  <button
                                    type="button"
                                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                  >
                                    Change
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Personal Information
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Use a permanent address where you can recieve
                                mail.
                              </p>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="firstName"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  {...getFieldProps('firstName')}
                                  autoComplete="given-name"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="last_name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  {...getFieldProps('lastName')}
                                  autoComplete="family-name"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Country / Region
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country"
                                  {...getFieldProps('country')}
                                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="street_address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Street address
                                </label>
                                <input
                                  type="text"
                                  name="street1"
                                  id="street1"
                                  {...getFieldProps('street1')}
                                  autoComplete="street-address"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  {...getFieldProps('city')}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State / Province
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  id="state"
                                  {...getFieldProps('state')}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="postal_code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  ZIP / Postal
                                </label>
                                <input
                                  type="text"
                                  name="zip"
                                  id="zip"
                                  {...getFieldProps('zip')}
                                  autoComplete="postal-code"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Notifications
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Provide basic informtion about the job. Be
                                specific with the job title.
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
                                      Get notified when someones posts a comment
                                      on a posting.
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
                                        Get notified when a candidate applies
                                        for a job.
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
                                        Get notified when a candidate accepts or
                                        rejects an offer.
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
                                These are delivered via SMS to your mobile
                                phone.
                              </p>
                              <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                  <input
                                    id="push_everything"
                                    name="push_notifications"
                                    type="radio"
                                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                  />
                                  <label
                                    htmlFor="push_everything"
                                    className="ml-3"
                                  >
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
                                  <label
                                    htmlFor="push_nothing"
                                    className="ml-3"
                                  >
                                    <span className="block text-sm font-medium text-gray-700">
                                      No push notifications
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}

        <Modal
          {...modal}
          onClose={() => setModal({ ...modal, show: false })}
        ></Modal>
      </main>
    </DashboardLayout>
  );
}
