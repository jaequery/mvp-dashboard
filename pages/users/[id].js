import { Field, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { FilePicker } from '../../components/form/FilePicker';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { Modal } from '../../components/Modal';
import { useApiGet, useApiPatch } from '../../hooks/api.hooks';
import { formatFormikValues } from '../../utils/formatter';

export default function UserPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('account');

  const [modal, setModal] = useState({
    show: false,
    title: 'Saved!',
    description: 'You have saved successfully',
    buttonText: 'Ok',
  });
  const [saveUser, saveUserRes] = useApiPatch(`/users/${router.query.id}`);
  const [getUser, userRes] = useApiGet(`/users/${router.query.id}`, {
    enabled: true,
  });

  useEffect(() => {
    if (saveUserRes.data) {
      modal.show = true;
      modal.title = 'Success';
      setModal(modal);
    }
  }, [saveUserRes.isSuccess]);

  return (
    <DashboardLayout>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        {/* Page header */}

        {!userRes?.isLoading && userRes?.data?.id && (
          <Formik
            initialValues={formatFormikValues({ ...userRes.data })}
            onSubmit={(values) => {
              saveUser(values);
            }}
          >
            {({
              values,
              getFieldProps,
              setFieldValue,
              handleSubmit,
              touched,
              errors,
            }) => {
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
                                      <Field
                                        type="text"
                                        disabled
                                        name="email"
                                        id="email"
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
                                      <FilePicker
                                        buttonLabel={'Change'}
                                        value={values.picture}
                                        maxNumberOfFiles={1}
                                        allowedFileTypes={['image/*']}
                                        onSuccess={(url) =>
                                          setFieldValue('picture', url)
                                        }
                                      ></FilePicker>
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
                                    <Field
                                      type="text"
                                      name="firstName"
                                      id="firstName"
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
                                    <Field
                                      type="text"
                                      name="lastName"
                                      id="lastName"
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
                                    <Field
                                      as="select"
                                      id="country"
                                      name="country"
                                      autoComplete="country"
                                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    >
                                      <option value="US">United States</option>
                                      <option value="CA">Canada</option>
                                      <option value="MX">Mexico</option>
                                    </Field>
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor="street_address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Street address
                                    </label>
                                    <Field
                                      type="text"
                                      name="street1"
                                      id="street1"
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
                                    <Field
                                      type="text"
                                      name="city"
                                      id="city"
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
                                    <Field
                                      type="text"
                                      name="state"
                                      id="state"
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
                                    <Field
                                      type="text"
                                      name="zip"
                                      id="zip"
                                      autoComplete="postal-code"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                          <Field
                                            name="settings.plan"
                                            value="standard"
                                            type="radio"
                                            className="h-4 w-4 text-cyan-500 cursor-pointer  border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                                          />
                                          <span className="ml-3 font-medium text-gray-900">
                                            Standard
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
                                          Up to 500 active users
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* On: "bg-orange-50 border-orange-200 z-10", Off: "border-gray-200" */}
                                      <div className="relative border border-gray-200 p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3">
                                        <label className="flex items-center text-sm cursor-pointer">
                                          <Field
                                            name="settings.plan"
                                            type="radio"
                                            value="startup"
                                            className="h-4 w-4 text-cyan-500 cursor-pointer  border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-describedby="plan-option-pricing-1 plan-option-limit-1"
                                            defaultChecked
                                          />
                                          <span className="ml-3 font-medium text-gray-900">
                                            Startup
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
                                          Up to 10,000 active users
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* On: "bg-orange-50 border-orange-200 z-10", Off: "border-gray-200" */}
                                      <div className="relative border border-gray-200 rounded-bl-md rounded-br-md p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3">
                                        <label className="flex items-center text-sm cursor-pointer">
                                          <Field
                                            name="settings.plan"
                                            value="enterprise"
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
                                          Unlimited users
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
