import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center  mx-auto">
      <div className="container px-4 max-w-[50vw]">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
            Submit your idea
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Have a great idea? Submit it here and we&apos;ll take a look.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-name"
            >
              Idea Name
            </label>
            <input
              className="peer h-10 w-full rounded-md border p-4"
              id="idea-name"
              placeholder="Enter the name of your idea"
            />
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border p-4 "
              id="idea-description"
              placeholder="Enter the description of your idea"
            />
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-requirements"
            >
              Requirements
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border p-4 "
              placeholder="Enter the requirements of your idea"
            />
          </div>
          
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-requirements"
            >
              Milestone 1
            </label>
            <input
              className="peer h-10 w-full rounded-md border p-4"
              id="milestone1"
              placeholder="Enter the amount"
            />
            <textarea
              className="flex min-h-[80px] w-full rounded-md border p-4 "
              placeholder="Milestone description"
              id="milestone1-description"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-requirements"
            >
              Milestone 1
            </label>
            <input
              className="peer h-10 w-full rounded-md border p-4"
              id="milestone2"
              placeholder="Enter the amount"
            />
            <textarea
              className="flex min-h-[80px] w-full rounded-md border p-4 "
              placeholder="Milestone description"
              id="milestone2-description"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold tracking-wide peer"
              htmlFor="idea-requirements"
            >
              Milestone 1
            </label>
            <input
              className="peer h-10 w-full rounded-md border p-4"
              id="milestone3"
              placeholder="Enter the amount"
            />
            <textarea
              className="flex min-h-[80px] w-full rounded-md border p-4 "
              placeholder="Milestone description"
              id="milestone3-description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="equity" className="bg-blue-100" />
            <label className="text-sm leading-none" htmlFor="equity">
              Require equity for this idea
            </label>
          </div>
          <button className="w-fit px-4 py-2 bg-black text-white rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
