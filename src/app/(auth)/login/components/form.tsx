import { ArrowRight, Lock, School, User } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useLoginForm } from '../hooks/use-login';

const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const { form, onSubmit, isLoading } = useLoginForm();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="relative flex w-full flex-col items-center justify-center space-y-8">
        <Image
          src="/images/utm-logo.png"
          alt="University Logo"
          width={300}
          height={75}
          className="mb-6"
          priority
        />

        <Card className="w-full overflow-hidden border-gray-100 bg-background/90 backdrop-blur-md">
          <div className="absolute left-0 top-0 h-1 w-full bg-primary"></div>
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-semibold text-primary">Professor Portal</CardTitle>
            <CardDescription>Sign in to manage your course attendance</CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Form {...form}>
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <FormLabel className="text-sm font-medium">University Email</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="professor@university.edu"
                            className="pl-10 transition-all focus-visible:border-primary/50 focus-visible:ring-primary/50"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <a
                          href="#"
                          className="text-xs text-primary hover:text-primary/80 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="password"
                            className="pl-10 transition-all focus-visible:border-primary/50 focus-visible:ring-primary/50"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-3 w-full gap-2 font-medium shadow-sm transition-all duration-200 hover:gap-3 hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <span className="flex items-center justify-center gap-1.5">
                    <School className="h-4 w-4" />
                    Student Attendance Management System
                  </span>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
