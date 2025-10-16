import { Card, CardContent } from "@/components/ui/card";

export default function DashboardStatsCard({ stat = {} }) {
 return (
  <Card>
   <CardContent className="pt-6">
    <div className="flex items-center justify-between">
     <div>
      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
      <p className="text-3xl font-bold">{stat.data}</p>
     </div>
     <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
      {stat.icon && <stat.icon className="h-6 w-6 text-primary" />}
     </div>
    </div>
   </CardContent>
  </Card>
 );
}
