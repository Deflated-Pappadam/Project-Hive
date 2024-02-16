
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function Component() {
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
            <Input className="peer h-10" id="idea-name" placeholder="Enter the name of your idea" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wide peer" htmlFor="idea-description">
              Description
            </label>
            <Textarea
              className="peer h-[120px]"
              id="idea-description"
              placeholder="Enter the description of your idea"
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
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="equity" />
            <label className="text-sm leading-none" htmlFor="equity">
              Require equity for this idea
            </label>
          </div>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  )
}

