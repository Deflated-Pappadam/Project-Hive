'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/app/utils/firebase"

export default function Component() {
  const [Name, setName] = useState("")
  const [Description, setDescription] = useState("")
  const [requirements, setRequirements] = useState("")
  const [Equity, setEquity] = useState(false)
  const [milestones, setMilestone] = useState([])

  const handleSubmit = () => {
    addDoc(collection(db, 'innovations'), {
      Name: Name,
      Description: Description,
      Requirements: requirements,
      Equity: Equity,
      Milestones: [
        {
          Name: 'MileStone 1',
          Cost: 1000,
          Status: 'incomplete'
        },
        {
          Name: 'MileStone 2',
          Cost: 2000,
          Status: 'incomplete'
        },
        {
          Name: 'MileStone 3',
          Cost: 4000,
          Status: 'incomplete'
        }
      ]
    })
  }

  return (
    <div className="w-full h-full flex justify-center items-center  mx-auto">
      <div className="container px-4 max-w-[50vw]">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">Submit your idea</h1>
          <p className="text-gray-500 dark:text-gray-400">Have a great idea? Submit it here and we&apos;ll take a look.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wide peer" htmlFor="idea-name">
              Idea Name
            </label>
            <Input className="peer h-10" id="idea-name" placeholder="Enter the name of your idea" onChange={(e) => setName(e.target.value)} value={Name}/>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wide peer" htmlFor="idea-description">
              Description
            </label>
            <Textarea
              className="peer h-[120px]"
              id="idea-description"
              placeholder="Enter the description of your idea"
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wide peer" htmlFor="idea-requirements">
              Requirements
            </label>
            <Textarea
              className="peer h-[120px]"
              id="idea-requirements"
              placeholder="Enter the requirements of your idea"
              onChange={(e) => setRequirements(e.target.value)}
              value={requirements}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="equity"
              onChange={() => setEquity(!Equity)} 
            />
            <label className="text-sm leading-none" htmlFor="equity">
              Require equity for this idea
            </label>
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

