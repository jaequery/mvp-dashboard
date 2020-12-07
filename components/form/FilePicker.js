import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';

import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { DashboardModal } from '@uppy/react';
import Tus from '@uppy/tus';
import { useState } from 'react';
import Link from 'next/link';

const uppy = new Uppy();
uppy.use(Tus, {
  endpoint: 'https://master.tus.io/files/', // use your tus endpoint here
  resume: true,
  autoRetry: true,
  retryDelays: [0, 1000, 3000, 5000],
});

export const FilePicker = ({
  buttonLabel = 'Upload',
  maxNumberOfFiles = 1,
  allowedFileTypes, // ['image/*', 'video/*']
  value,
  onSuccess,
}) => {
  const [url, setUrl] = useState(value);
  uppy.setOptions({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles, allowedFileTypes },
    autoProceed: true,
  });
  uppy.on('complete', (result) => {
    const url = result.successful[0].uploadURL;
    setUrl(url);
    onSuccess(url);
  });

  const [show, setShow] = useState(false);
  return (
    <>
      <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
        {!url && (
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        {url && (
          <Link href={url}>
            <a target="_blank">
              <img src={url} />
            </a>
          </Link>
        )}
      </span>

      <button
        onClick={() => setShow(true)}
        type="button"
        className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        {buttonLabel}
      </button>
      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={show}
        onRequestClose={() => {
          setShow(false);
          uppy.reset();
        }}
        plugins={['Webcam']}
        theme={'light'}
        closeAfterFinish={true}
        proudlyDisplayPoweredByUppy={false}
      />
    </>
  );
};
