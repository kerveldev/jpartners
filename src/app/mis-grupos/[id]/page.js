import InformacionGrupo from "@/components/pages/mis-grupos/InformacionGrupo";

export default function DetalleGrupoPage({ params }) {
  return <InformacionGrupo groupId={params.id} />;
}