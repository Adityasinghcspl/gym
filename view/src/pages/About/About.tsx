import React from 'react';
import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import ChoseUs from '../../components/ChoseUs/ChoseUs';
import GymTeam from '../../components/GymTeam/GymTeam';
import Banner from '../../components/Banner/Banner';

export default function About() {
  return (
    <>
      {/* Breadcrumb Section */}
      <StieBreadcrumb />
      {/* ChoseUs Section  */}
      <ChoseUs />
      {/* Our Teams  */}
      <GymTeam/>
      {/* Banner Section Begin */}
      <Banner />
    </>
  );
}
