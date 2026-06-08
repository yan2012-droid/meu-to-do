"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern web application built with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Modern Design</CardTitle>
              <CardDescription>
                Clean and responsive interface using Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4"></div>
              <Button className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">TypeScript Ready</CardTitle>
              <CardDescription>
                Full type safety with TypeScript configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-4"></div>
              <Button className="w-full">Explore Features</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Component Library</CardTitle>
              <CardDescription>
                Built with shadcn/ui components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-orange-500 to-red-600 rounded-lg mb-4"></div>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="px-8 py-3 text-lg">
            Begin Your Journey
          </Button>
        </div>

        <MadeWithDyad />
      </div>
    </Layout>
  );
};

export default Index;