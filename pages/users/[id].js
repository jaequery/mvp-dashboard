import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import { Modal } from '../../components/Modal';
import { api } from '../../hooks/api.hooks';

export default function UserPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('account');

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
            initialValues={{ ...userRes.data }}
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
                            onClick={() => setActiveTab('account')}
                            href="#"
                            className={`tab ${
                              activeTab === 'account' ? 'active' : ''
                            }`}
                            aria-current="page"
                          >
                            {/* Heroicon name: user-circle */}
                            <svg
                              className={`tab-icon ${
                                activeTab === 'account' ? 'active' : ''
                              }`}
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
                            <span className="truncate">My Account</span>
                          </a>

                          <a
                            href="#"
                            onClick={() => setActiveTab('plan')}
                            className={`tab ${
                              activeTab === 'plan' ? 'active' : ''
                            }`}
                          >
                            {/* Heroicon name: credit-card */}
                            <svg
                              className={`tab-icon ${
                                activeTab === 'plan' ? 'active' : ''
                              }`}
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
                        </nav>
                      </aside>

                      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                        {activeTab === 'account' && (
                          <>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                <div>
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Your Profile
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly
                                    so be careful what you share.
                                  </p>
                                </div>
                                <div className="grid grid-cols-4 gap-6">
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
                                        disabled
                                        name="email"
                                        id="email"
                                        {...getFieldProps('email')}
                                        autoComplete="email"
                                        className="bg-gray-100 focus:ring-cyan-500 focus:border-cyan-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                                    Use a permanent address where you can
                                    recieve mail.
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
                                      <option value="US">United States</option>
                                      <option value="CA">Canada</option>
                                      <option value="MX">Mexico</option>
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

                            {/* <div className="shadow sm:rounded-md sm:overflow-hidden">
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
                                          Get notified when someones posts a
                                          comment on a posting.
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
                                            Get notified when a candidate
                                            applies for a job.
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
                                            Get notified when a candidate
                                            accepts or rejects an offer.
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
                                      <label
                                        htmlFor="push_email"
                                        className="ml-3"
                                      >
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
                            </div> */}
                          </>
                        )}

                        {activeTab === 'plan' && (
                          <section aria-labelledby="plan_heading">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                <div>
                                  <h2
                                    id="plan_heading"
                                    className="text-lg leading-6 font-medium text-gray-900"
                                  >
                                    Plan
                                  </h2>
                                </div>
                                <fieldset>
                                  <legend className="sr-only">
                                    Pricing plans
                                  </legend>
                                  <ul className="relative bg-white rounded-md -space-y-px">
                                    <li>
                                      {/* On: "bg-orange-50 border-orange-200 z-10", Off: "border-gray-200" */}
                                      <div className="relative border rounded-tl-md rounded-tr-md p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3">
                                        <label className="flex items-center text-sm cursor-pointer">
                                          <input
                                            name="pricing_plan"
                                            type="radio"
                                            className="h-4 w-4 text-cyan-500 cursor-pointer  border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                                          />
                                          <span className="ml-3 font-medium text-gray-900">
                                            Startup
                                          </span>
                                        </label>
                                        <p
                                          id="plan-option-pricing-0"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                        >
                                          {/* On: "text-cyan-900", Off: "text-gray-900" */}
                                          <span className="font-medium">
                                            $29 / mo
                                          </span>
                                          {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                          <span>($290 / yr)</span>
                                        </p>
                                        {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                        <p
                                          id="plan-option-limit-0"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                        >
                                          Up to 5 active job postings
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* On: "bg-orange-50 border-orange-200 z-10", Off: "border-gray-200" */}
                                      <div className="relative border border-gray-200 p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3">
                                        <label className="flex items-center text-sm cursor-pointer">
                                          <input
                                            name="pricing_plan"
                                            type="radio"
                                            className="h-4 w-4 text-cyan-500 cursor-pointer  border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-describedby="plan-option-pricing-1 plan-option-limit-1"
                                            defaultChecked
                                          />
                                          <span className="ml-3 font-medium text-gray-900">
                                            Business
                                          </span>
                                        </label>
                                        <p
                                          id="plan-option-pricing-1"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                        >
                                          {/* On: "text-cyan-900", Off: "text-gray-900" */}
                                          <span className="font-medium">
                                            $99 / mo
                                          </span>
                                          {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                          <span>($990 / yr)</span>
                                        </p>
                                        {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                        <p
                                          id="plan-option-limit-1"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                        >
                                          Up to 25 active job postings
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* On: "bg-orange-50 border-orange-200 z-10", Off: "border-gray-200" */}
                                      <div className="relative border border-gray-200 rounded-bl-md rounded-br-md p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3">
                                        <label className="flex items-center text-sm cursor-pointer">
                                          <input
                                            name="pricing_plan"
                                            type="radio"
                                            className="h-4 w-4 text-cyan-500 cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-describedby="plan-option-pricing-2 plan-option-limit-2"
                                          />
                                          <span className="ml-3 font-medium text-gray-900">
                                            Enterprise
                                          </span>
                                        </label>
                                        <p
                                          id="plan-option-pricing-2"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                        >
                                          {/* On: "text-cyan-900", Off: "text-gray-900" */}
                                          <span className="font-medium">
                                            $249 / mo
                                          </span>
                                          {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                          <span>($2490 / yr)</span>
                                        </p>
                                        {/* On: "text-cyan-700", Off: "text-gray-500" */}
                                        <p
                                          id="plan-option-limit-2"
                                          className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                        >
                                          Unlimited active job postings
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </fieldset>
                                <div className="flex items-center">
                                  {/* On: "bg-orange-500", Off: "bg-gray-200" */}
                                  <button
                                    type="button"
                                    aria-pressed="true"
                                    aria-labelledby="toggleLabel"
                                    className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors ease-in-out duration-200"
                                  >
                                    <span className="sr-only">Use setting</span>
                                    {/* On: "translate-x-5", Off: "translate-x-0" */}
                                    <span
                                      aria-hidden="true"
                                      className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                    />
                                  </button>
                                  <span id="toggleLabel" className="ml-3">
                                    <span className="text-sm font-medium text-gray-900">
                                      Annual billing{' '}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      (Save 10%)
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                  type="submit"
                                  className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </section>
                        )}
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

      <style jsx global>{``}</style>
    </DashboardLayout>
  );
}
