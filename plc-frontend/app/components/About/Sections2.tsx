"use client";

import React from 'react';
import { FadeIn } from './Sections1';
import {
  ShieldCheck, Zap, Truck, Wrench, Search, Factory,
  Droplets, FlaskConical, Box, Battery, Anchor, Cpu, Building2
} from 'lucide-react';

export const Timeline = () => {
  const milestones = [
    { year: "2021", title: "Company Founded", desc: "PLC Automation Group was established with a mission to provide reliable industrial automation components and obsolete PLC spare parts. Starting with a two-person team, we quickly became a trusted partner for Oil & Gas and Semiconductor industries." },
    { year: "2022", title: "Regional Growth", desc: "Expanded operations across Singapore and Malaysia while growing our team. Successfully supported customers in Oil & Gas, Marine, FMCG, Offshore, and Semiconductor sectors." },
    { year: "2023", title: "Major Milestones", desc: "Established our own inventory facility, expanded into Indonesia, surpassed $1.5M annual revenue, and earned SME500, BizSafe Star, and ISO 45001 certifications." },
    { year: "2024", title: "Engineering Services Launch", desc: "Expanded beyond industrial spare parts by introducing Engineering Services, automation support, technical consulting, and project execution. Moved into our own office and strengthened industry partnerships." },
    { year: "2025", title: "Scaling Operations", desc: "Opened a larger facility with an in-house warehouse, testing center, and quality control operations. Expanded into Utilities and Energy while implementing CRM-driven digital transformation." }
    //{ year: "2026", title: "Australia Expansion", desc: "Launched PLC Automation Australia Pty Ltd with offices in Sydney and Perth, extending our presence across the Asia-Pacific region and strengthening customer support capabilities." }
    //{ year: "2026", title: "Industry Recognition", desc: "Served 10,000+ customers, completed 600+ engineering projects, supplied 100,000+ industrial spare parts, and received prestigious recognitions including the Entrepreneur 100 Award." }
    //{ year: "Today", title: "Powering Industries Across Asia-Pacific", desc: "With operations in Singapore and Australia, PLC Automation Group continues to deliver industrial automation solutions, engineering expertise, and technical support to customers across Asia-Pacific through innovation, reliability, and customer-focused service." }
  ];

  return (
    <section className="py-24 bg-slate-50 section_grey_content">
      <div className="section_container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
              <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
          </FadeIn>

          <div className="relative border-l-4 border-primary/20 ml-4 md:ml-8">
            {milestones.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="mb-12 ml-8 relative">
                  <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-primary ring-4 ring-slate-50" />
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="inline-block px-4 py-1 bg-accent text-primary font-bold rounded-full text-sm mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs = () => {
  const reasons = [
    { icon: <Search className="w-6 h-6" />, title: "Global Sourcing Network", desc: "Access to millions of parts worldwide through our verified supplier network." },
    { icon: <Cpu className="w-6 h-6" />, title: "Obsolete PLC Specialists", desc: "We specialize in finding legacy parts that manufacturers no longer support." },
    { icon: <Zap className="w-6 h-6" />, title: "Fast Emergency Support", desc: "Rapid response times and expedited shipping options to minimize downtime." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Quality-Assured", desc: "All components undergo rigorous visual and functional inspections." },
    { icon: <Truck className="w-6 h-6" />, title: "Worldwide Delivery", desc: "Reliable international shipping with trusted logistics partners." },
    { icon: <Wrench className="w-6 h-6" />, title: "Technical Expertise", desc: "Our team understands industrial control systems inside and out." }
  ];

  return (
    <section className="py-24 bg-white section_white_content">
      <div className="section_container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
              <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group h-full">
                  <div className="w-14 h-14 bg-accent text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Industries = () => {
  const industries = [
    { icon: <Factory />, name: "Oil & Gas" },
    { icon: <Anchor />, name: "Marine & Offshore" },
    { icon: <Zap />, name: "Power Generation" },
    { icon: <Droplets />, name: "Water & Wastewater" },
    { icon: <FlaskConical />, name: "Pharmaceutical" },
    { icon: <Box />, name: "Food & Beverage" },
    { icon: <Battery />, name: "Mining & Metals" },
    { icon: <Building2 />, name: "Manufacturing" },
    { icon: <Truck />, name: "Logistics" },
    { icon: <ShieldCheck />, name: "Infrastructure" }
  ];

  return (
    <section className="py-24 bg-slate-50 section_grey_content">
      <div className="section_container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-primary hover:shadow-md transition-all group flex flex-col items-center justify-center aspect-square">
                <div className="text-slate-400 group-hover:text-primary transition-colors mb-4 scale-150">
                  {ind.icon}
                </div>
                <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm md:text-base">
                  {ind.name}
                </h4>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export const Brands = () => {
  const brands = [
    "Siemens", "Allen Bradley", "ABB", "Schneider Electric",
    "Mitsubishi Electric", "Omron", "Yokogawa", "Honeywell",
    "Fanuc", "Emerson"
  ];

  return (
    <section className="py-24 bg-white section_white_content">
      <div className="section_container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Supporting the World's Leading Automation Brands</h2>
            <div className="w-16 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">We source components from top-tier manufacturers, ensuring your systems run on trusted, industrial-grade hardware.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="h-24 px-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-white hover:border-primary hover:shadow-md transition-all cursor-default">
                <span className="font-bold text-slate-800 text-lg md:text-xl text-center tracking-tight">{brand}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};