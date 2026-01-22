"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail } from 'lucide-react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import StarBorder from '@/components/layout/star-border'

const loginSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    // 2. Initialize Form
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 3. Submit Handler
    async function onSubmit(values: LoginFormData) {
        await toast.promise(
            (async () => {
                const result = await signIn("credentials", {
                    ...values,
                    redirect: false, // Must be false to handle errors manually
                });

                if (result?.error) {
                    // This triggers the 'error' state in toast.promise
                    throw new Error(result.error);
                }

                // Success - manually redirect
                window.location.href = "/dashboard";
                return result;
            })(),
            {
                pending: "Logging in...",
                success: "Log in successful! Redirecting...",
                error: {
                    render({ data }) {
                        // 'data' here is the error object thrown by handleRegisterAction
                        return data && typeof data == "object" && "message" in data ? data?.message as string : "Login failed. Please try again.";
                    },
                },
            });
    }

    return (
        <Card className="mx-auto bg-background rounded-3xl border border-white/10 backdrop-blur-xl w-110 sm:p-5 p-5">
            <CardHeader className="flex flex-col items-center px-0">
                <div className='md:w-16 md:h-16 h-12 w-12 md:[&_svg]:size-8 [&_svg]:size-5 flex items-center justify-center bg-white shrink-0 text-background rounded-2xl'>
                    <LogIn />
                </div>
                <div className='flex mt-4 flex-col item-center text-center gap-1 font-preahvihear-sans'>
                    <CardTitle className='md:text-2xl text-xl font-bold text-white'>Sign in with email</CardTitle>
                    <CardDescription
                        className='md:text-sm text-xs'>
                        Sign In to Add Projects in Portfolio
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className='px-0'>
                <Form {...form}>
                    <form
                        className='w-full mt-4 flex flex-col gap-2'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col relative [&_svg]:size-5 text-white">
                                    <Mail className='absolute left-3 top-5 -translate-y-1/2' />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-10 pl-12 rounded-xl'
                                            placeholder="Email"
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage className='-mt-3 mb-3' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center relative [&_svg]:size-5 text-white">
                                    <LockKeyhole className='absolute left-3 top-5 -translate-y-1/2' />
                                    <FormControl>
                                        <Input
                                            className='h-10 pl-12'
                                            {...field}
                                            placeholder='Password'
                                            type={showPassword ? "text" : "password"}
                                            required
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-5 -translate-y-1/2 h-full px-3 !text-white  hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <a
                            href="#"
                            className="float-end ml-auto mb-3 text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>

                        <StarBorder
                            className="h-12 w-full"
                            color="cyan"
                            speed="5s"
                        >
                            <p className="w-full h-full flex text-center items-center justify-center">
                                Sign in
                            </p>
                        </StarBorder>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}

export default SignIn
