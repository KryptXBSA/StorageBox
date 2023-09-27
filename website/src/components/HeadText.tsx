export function HeadText({ text }: { text: string }) {
  return (
    <>
      <div className="flex justify-between">
        <ol className="flex text-lg items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a className="inline-flex text-xl items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              {text}
            </a>
          </li>
        </ol>
      </div>
    </>
  )
}
