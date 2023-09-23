import * as React from "react"
import { serverUrl } from "@/config"
import { File } from "@/types"

import { handleDownload } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

import { GetFileIcon } from "./GetFileIcon"
import { RowAction } from "./RowAction"
import { getAppState } from "@/state/state"

export function FileCard(p: File) {
  const token = getAppState().session?.token

  return (
    <Card className="w-[200px] hover:bg-slate-500/50 cursor-pointer duration-300 transition-colors border-none bg-slate-500/20 h-[160px] py-2">
      <CardContent className="flex p-4 flex-col items-center justify-center">
        {/* {isImage ? ( */}
        {/*   content && <img src={content} alt={p.name} /> */}
        {/* ) : ( */}
        {/*   <pre className="w-20 h-16 overflow-auto">{content}</pre> */}
        {/* )} */}
        {/* TODO change icon based on type */}
        <GetFileIcon type={p.type} view="grid" />
        <p className="overflow-hidden text-center w-20 truncate whitespace-nowrap text-overflow-ellipsis">
          {/* <a */}
          {/*   // href="#" */}
          {/*   onClick={handleDownloadClick} */}
          {/*   target="_blank" */}
          {/*   style={{ textDecoration: "underline", cursor: "pointer" }} */}
          {/*   download */}
          {/* > */}
          {p.name}
          {/* </a> */}
        </p>
        <RowAction
          handleDownload={() => handleDownload({ ...p, token: token! })}
          horizontal
          isFolder={false}
          name={p.name}
          id={p.id}
        />
      </CardContent>
    </Card>
  )
}
