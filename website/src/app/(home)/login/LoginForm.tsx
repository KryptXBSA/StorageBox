"use client"

import { useRouter } from "next/navigation"
import { login } from "@/api/login"
import {
  DISCORD_CLIENT_ID,
  DISCORD_REDIRECT_URI,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
} from "@/config"
import { ErrorRes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { GithubIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DiscordIcon from "@/components/icons/Discord"
import GoogleIcon from "@/components/icons/Google"

const formSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const mutation = useMutation({
    mutationFn: login,
    onError: (e: AxiosError<ErrorRes>) => {
      toast.error(e.response?.data.message)
      return e
    },
  })

  let router = useRouter()
  if (mutation.isSuccess) {
    toast.success("Logging in")
    Cookies.set("token", mutation.data.token, { secure: true })
    router.push("/dashboard")
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  function googleLogin() {
    const clientId = GOOGLE_CLIENT_ID // Your Google OAuth client ID
    const redirectUri = GOOGLE_REDIRECT_URI // Your OAuth redirect URI
    const scope = "openid email profile" // Scopes required by your application

    // Construct the Google OAuth URL
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

    // Use router to replace the URL with the authUrl
    router.replace(authUrl)
  }
  function discordLogin() {
    const clientId = DISCORD_CLIENT_ID // Your Discord OAuth client ID
    const redirectUri = DISCORD_REDIRECT_URI // Your OAuth redirect URI
    const scope = "identify email" // Scopes required by your application
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
    router.replace(authUrl)
  }

  function githubLogin() {
    const clientId = GITHUB_CLIENT_ID
    const redirectUri = GITHUB_REDIRECT_URI
    const scope = "read:user user:email"

    // Construct the GitHub OAuth URL
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    router.replace(authUrl)
  }
  return (
    <div className="flex flex-col justify-center gap-2 py-10 mx-auto w-full items-center">
      <Button
        variant="outline"
        className="flex gap-2 h-12 w-52 rounded-lg "
        onClick={githubLogin}
      >
        <GithubIcon className="w-8 h-8" />
        Login with Github
      </Button>
      <Button
        variant="outline"
        className="flex gap-2 h-12 w-52 rounded-lg "
        onClick={discordLogin}
      >
        <DiscordIcon className="w-8 h-8" />
        Login with Discord
      </Button>
      <Button
        variant="outline"
        className="flex gap-2 h-12 w-52 rounded-lg "
        onClick={googleLogin}
      >
        <GoogleIcon className="w-8 h-8" />
        Login with Google
      </Button>
      <fieldset className="md:w-1/3 lg:w-1/4 w-full sm:w-1/2 border-t border-gray-600">
        <legend className="mx-auto grow px-2 text-lg text-black dark:text-white ">
          or
        </legend>
      </fieldset>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
          <p className="text-sm text-gray-500">
            If you don't have an account. We'll create one for you.
          </p>
        </form>
      </Form>
    </div>
  )
}
