import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, DollarSign, PiggyBank, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Expense Tracker Pro</CardTitle>
          <CardDescription>Your Personal Finance Companion</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Expense Tracker Pro is your go-to solution for managing personal finances with ease and precision. 
            Whether you're budgeting for your next big purchase or trying to cut down on daily expenses, 
            we've got you covered.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <DollarSign className="mr-1" /> Smart Budgeting
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <ChartBar className="mr-1" /> Insightful Analytics
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <Sparkles className="mr-1" /> Intuitive Design
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Powerful Features at Your Fingertips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Real-time expense tracking</li>
                <li>Secure cloud sync across devices</li>
                <li>Easy to use creation of expenses</li>
                <li>Deletion of expenses created in error</li>
                <li>Secure database for storage</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="how-it-works">
          <Card>
            <CardHeader>
              <CardTitle>Simple Steps to Financial Freedom</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sign up for a free account</li>
                <li>Start logging your daily expenses</li>
                <li>Review insights and adjust your spending habits</li>
                <li>Watch your savings grow!</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>What Our Users Say</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 pl-4 italic mb-4">
                "Expense Tracker Pro has completely transformed how I manage my money. I've never felt more in control of my finances!"
                <footer className="text-right">- Sarah K., Freelance Designer</footer>
              </blockquote>
              <blockquote className="border-l-4 pl-4 italic">
                "As a small business owner, this app has been a game-changer for separating personal and business expenses."
                <footer className="text-right">- Michael T., Entrepreneur</footer>
              </blockquote>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Take Control of Your Finances?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Join thousands of users who have already discovered the power of Expense Tracker Pro. 
            Start your journey to financial wellness today!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="mr-4">
            <PiggyBank className="mr-2" /> <Link to='/expenses'>Start Tracking</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link to='/create-expense'>Start Spending</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

