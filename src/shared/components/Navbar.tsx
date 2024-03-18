/* eslint-disable @next/next/no-img-element */
'use client'

import Icon from "./Icon"
import { useSession } from "next-auth/react";

const NavBar = () => {
  const todayDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' as const });
  const todayDate = new Date().toLocaleDateString('en-US', { day: 'numeric' });
  const todayMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
  const todayYear = new Date().toLocaleDateString('en-US', { year: 'numeric' });

  const { data: session } = useSession();

  return (
    <nav className="sn-nav">
      <time>
        <Icon name="time" />
        {todayDayName}, {todayDate} {todayMonth} {todayYear}
      </time>
      <button className="change-theme" ><Icon name="night" /></button>
      {/* <button><Icon name="bell" /></button> */}
      <div className="sn-nav-user">
        <img src={session?.user?.image ? session.user.image : ""} alt="user" width={40} height={40} />
        <div className="user-info">
          <span className="user-name">{session?.user?.name}</span>
          <span className="user-email">{session?.user?.email}</span>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;