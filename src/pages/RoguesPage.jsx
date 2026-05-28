import PageShell from "../components/PageShell";
import RoguesGallery from "../components/RoguesGallery";

export default function RoguesPage() {
  return (
    <PageShell bare>
      <div className="pt-16">
        <RoguesGallery />
      </div>
    </PageShell>
  );
}
