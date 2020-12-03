import Link from 'next/link';
import { useEffect, useState } from 'react';

export const RegistrationLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};
