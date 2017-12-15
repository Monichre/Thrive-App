import React, {Component} from 'react'
import FitnessTrack from './Components/Tracks/FitnessTrack'
import FinanceTrack from './Components/Tracks/FinanceTrack'
import SkillTrack from './Components/Tracks/SkillTrack'

export const Constants = {
    renderProperTrack: (track, trackSubmit) => {
      if(track === 'fitnessTrack') {

        return <FitnessTrack submitSuccessTrack={trackSubmit} />

      } else if(track === 'financeTrack') {

        return <FinanceTrack submitSuccessTrack={trackSubmit} />

      }
      else if(track === 'skillTrack') {

        return <SkillTrack submitSuccessTrack={trackSubmit} />

      }
    }
}