"use client";

import { cn } from "@/lib";

import { CardDescription, Tabs, TabsContent, TabsList, TabsTrigger } from ".";

export interface Tab {
  id: number;
  tab_label: string;
  icon?: React.ReactNode;
  description?: string;
  title?: string;
  extra?: React.ReactNode;
  content?: React.ReactNode;
}

type Props = {
  tabs: Tab[];
  id: string;
  className?: string;
  defaultValue?: number | string;
};

/**
 * @file my-tabs.tsx
 * @description MyTabs component
 */
export const MyTabs = ({ tabs = [], id, className, defaultValue = 1 }: Props) => {
  return (
    <Tabs
      defaultValue={defaultValue?.toString()}
      className={cn("relative h-full w-full px-4", className)}
    >
      <TabsList className="sticky top-(--top-gap) z-4 flex w-full max-w-full justify-center overflow-x-auto rounded-sm shadow max-xl:items-start max-xl:justify-start">
        {tabs?.map((tab) => {
          return (
            <TabsTrigger
              key={`${id}_${tab?.id.toString()}`}
              value={tab?.id.toString()}
              className="cursor-pointer rounded-[3px] data-[state=active]:text-primary dark:data-[state=active]:bg-primary/10 dark:data-[state=active]:text-primary"
            >
              {tab?.icon && tab?.icon}
              <span className={cn(tab?.icon && "max-lg:hidden")}>
                {tab?.tab_label}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs?.map((tab) => (
        <TabsContent key={`${id}_${tab?.id.toString()}`} value={tab.id.toString()}>
          {tab?.title && (
            <div className="mb-4 space-y-1">
              <div className="flex items-center justify-between gap-4 max-md:flex-wrap">
                <h1 className="heading">{tab?.title}</h1>
                {tab?.extra && (
                  <div className="flex flex-wrap gap-3">{tab?.extra}</div>
                )}
              </div>

              {tab?.description && (
                <CardDescription>{tab?.description}</CardDescription>
              )}
            </div>
          )}
          {tab?.content ?? "No tab content available."}
        </TabsContent>
      ))}
    </Tabs>
  );
};
