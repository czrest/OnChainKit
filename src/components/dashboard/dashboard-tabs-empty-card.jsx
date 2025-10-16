import { Card, CardContent } from "@/components/ui/card";

export default function DashboardTabsEmptyCard({ message = "" }) {
 return (
  <Card>
   <CardContent className="pt-12 pb-12 text-center">
    <p className="text-muted-foreground">{message}</p>
   </CardContent>
  </Card>
 );
}
