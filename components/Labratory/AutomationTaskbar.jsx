import React from 'react'
import AutomationSwitch from './AutomationSwitch'
import AutomationStatus from './AutomationStatus'

const AutomationTaskbar = ({setAutomationSwitch, automationSwitch}) => {
  return (
    <div className="w-full mx-auto p-4 mt-2 bg-white shadow-md rounded-lg flex flex-row justify-between">
        <AutomationSwitch automationSwitch={automationSwitch} setAutomationSwitch={setAutomationSwitch}/>
        <AutomationStatus automationSwitch={automationSwitch}/>
    </div>
  )
}

export default AutomationTaskbar