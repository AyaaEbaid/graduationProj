import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from './../../assets/logo2.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-100 bottom-0 left-0 right-0 mt-20 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <NavLink to="" className="flex md:mt-8 text-teal-600 w-64 hover:text-white flex-wrap items-center rtl:space-x-reverse">
              <img src={logo} className="h-12 w-20 pt-1" alt="Hanshtabhalk Logo" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-black">{t("footer.hanshtabhalk")}</span>
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-14 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 font-semibold text-gray-900 uppercase text-xl dark:text-white">
                {t("footer.contact_us")}
              </h2>
              <ul className="text-gray-900 hover:text-teal-500 font-medium">
                <li className="mb-4">
                  <NavLink to="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.phone")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.email")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl tracking-wider font-semibold text-gray-900 uppercase dark:text-white">
                {t("footer.follow_us")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <NavLink to="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.facebook")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-lg tracking-widest hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.twitter")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                {t("footer.terms_policies")}
              </h2>
              <ul className="text-gray-900 hover:text-teal-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <NavLink to="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.privacy_policy")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                    {t("footer.terms_conditions")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-800  sm:text-center dark:text-gray-400">
            {t("footer.copyright")} {t("footer.all_rights_reserved")}
          </span>
        </div>
      </div>
    </footer>
  );
}
