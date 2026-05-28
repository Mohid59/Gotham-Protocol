import PageShell from "../components/PageShell";
import Armory from "../components/Armory";

export default function ArmoryPage() {
  return (
    <PageShell bare>
      <div className="pt-16">
        <Armory />
      </div>
    </PageShell>
  );
}
