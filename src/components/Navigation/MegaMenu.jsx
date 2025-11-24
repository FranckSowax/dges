import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MegaMenu = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full pt-2 w-screen max-w-5xl -translate-x-1/3"
    >
      <div className="bg-white rounded-card-lg shadow-2xl border border-neutral-gray-light overflow-hidden">
        <div className="p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Sections */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-6">
              {data.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-bold text-neutral-black mb-3 uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item.href}
                          className="group flex items-start space-x-3 p-2 rounded-lg hover:bg-gabon-green-light transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gabon-green-light rounded-lg flex items-center justify-center group-hover:bg-gabon-green group-hover:text-white transition-colors">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-neutral-black group-hover:text-gabon-green text-sm">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-neutral-gray-dark mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Section */}
          {data.featured && (
            <div className="col-span-4 bg-gradient-to-br from-gabon-green-light to-gabon-blue-light rounded-card p-6">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gabon-green text-white text-xs font-bold rounded-full uppercase">
                  {data.featured.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-black mb-2">
                {data.featured.title}
              </h3>
              <p className="text-sm text-neutral-gray-dark mb-4">
                {data.featured.description}
              </p>
              <Link
                to={data.featured.href}
                className="inline-flex items-center space-x-2 text-gabon-green font-medium text-sm hover:text-gabon-green-dark transition-colors group"
              >
                <span>{data.featured.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
