import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Trash2, Pencil, Plus, LogOut, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Suryanshi Makeover" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <section className="min-h-screen flex items-center justify-center px-5 py-24">
        <Card className="max-w-md p-8 text-center space-y-4">
          <h1 className="font-display text-2xl">Access Denied</h1>
          <p className="text-sm text-muted-foreground">
            You're signed in as <strong>{user.email}</strong>, but this account doesn't have admin
            access. Contact the site owner to grant the <code>admin</code> role to your user in
            the database.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            <Button asChild><Link to="/">Back to Site</Link></Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-surface pt-28 pb-20 px-5 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl tracking-wide">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your site content & bookings</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/">View Site</Link></Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </header>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="site">Site Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="hero">Hero Video</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings"><BookingsAdmin /></TabsContent>
          <TabsContent value="site"><SiteInfoAdmin /></TabsContent>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="packages"><PackagesAdmin /></TabsContent>
          <TabsContent value="portfolio"><PortfolioAdmin /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsAdmin /></TabsContent>
          <TabsContent value="offers"><OffersAdmin /></TabsContent>
          <TabsContent value="hero"><HeroVideoAdmin /></TabsContent>
          <TabsContent value="reels"><ReelsAdmin /></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

/* ===================== BOOKINGS ===================== */
function BookingsAdmin() {
  type Booking = Tables<"bookings">;
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceMap, setServiceMap] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from("services").select("slug, name").then(({ data }) => {
      if (!data) return;
      const m: Record<string, string> = {};
      data.forEach((s) => { m[s.slug] = s.name; });
      setServiceMap(m);
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Updated"); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  if (loading) return <LoadingBlock />;
  if (!items.length) return <EmptyBlock label="No bookings yet" />;

  return (
    <Card className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="text-xs">{new Date(b.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{b.name}</TableCell>
              <TableCell>
                <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-gold-dark hover:underline">
                  {b.phone}
                </a>
              </TableCell>
              <TableCell className="text-xs">
                {b.email ? (
                  <a href={`mailto:${b.email}`} className="text-gold-dark hover:underline">{b.email}</a>
                ) : "—"}
              </TableCell>
              <TableCell className="text-sm">
                {b.service_slug ? (serviceMap[b.service_slug] ?? b.service_slug) : (b.event_type ?? "—")}
                {b.event_date && <div className="text-xs text-muted-foreground">{b.event_date}</div>}
                {b.location && <div className="text-xs text-muted-foreground">📍 {b.location}</div>}
              </TableCell>
              <TableCell>
                <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v as Booking["status"])}>
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => remove(b.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

/* ===================== SERVICES ===================== */
function ServicesAdmin() {
  type Service = Tables<"services">;
  const empty = {
    name: "", slug: "",
    tagline: "" as string | null,
    description: "" as string | null,
    image_url: "" as string | null,
    price_from: null as number | null, price_to: null as number | null,
    sort_order: 0, is_active: true,
  };
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("services").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.slug) { toast.error("Name & slug required"); return; }
    const payload = { ...editing };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ ...empty })} size="sm">
          <Plus className="w-4 h-4 mr-1" /> New Service
        </Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No services yet" /> : (
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.sort_order}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.slug}</TableCell>
                  <TableCell className="text-sm">
                    {s.price_from ? `₹${s.price_from}${s.price_to ? `–${s.price_to}` : "+"}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.is_active ? "default" : "secondary"}>{s.is_active ? "Yes" : "No"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(s)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(s.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Service" : "New Service"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Name"><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
          <Field label="Slug (url-safe)"><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></Field>
          <Field label="Tagline"><Input value={editing.tagline ?? ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} /></Field>
          <Field label="Description"><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
          <Field label="Image URL"><Input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price From (₹)"><Input type="number" value={editing.price_from ?? ""} onChange={(e) => setEditing({ ...editing, price_from: e.target.value ? Number(e.target.value) : null })} /></Field>
            <Field label="Price To (₹)"><Input type="number" value={editing.price_to ?? ""} onChange={(e) => setEditing({ ...editing, price_to: e.target.value ? Number(e.target.value) : null })} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order"><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <Field label="Active">
              <Select value={editing.is_active ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_active: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}

/* ===================== PACKAGES ===================== */
function PackagesAdmin() {
  type Pack = Tables<"packages">;
  const empty = {
    name: "", price: 0, features: [] as string[],
    sort_order: 0, is_active: true, is_popular: false,
  };
  const [items, setItems] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);
  const [featuresText, setFeaturesText] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("packages").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const startEdit = (p: Pack | null) => {
    if (p) {
      setEditing(p);
      setFeaturesText(p.features.join("\n"));
    } else {
      setEditing({ ...empty });
      setFeaturesText("");
    }
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.name) { toast.error("Name required"); return; }
    const features = featuresText.split("\n").map((s) => s.trim()).filter(Boolean);
    const payload = { ...editing, features };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("packages").update(payload).eq("id", editing.id)
      : await supabase.from("packages").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => startEdit(null)} size="sm"><Plus className="w-4 h-4 mr-1" /> New Package</Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No packages yet" /> : (
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.sort_order}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.features.length} items</TableCell>
                  <TableCell>{p.is_popular ? "★" : "—"}</TableCell>
                  <TableCell><Badge variant={p.is_active ? "default" : "secondary"}>{p.is_active ? "Yes" : "No"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Package" : "New Package"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Name"><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
          <Field label="Price (₹)"><Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} /></Field>
          <Field label="Features (one per line)">
            <Textarea rows={6} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="HD Bridal Makeup&#10;Hairstyling&#10;Draping" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Sort Order"><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <Field label="Popular">
              <Select value={editing.is_popular ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_popular: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Active">
              <Select value={editing.is_active ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_active: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}

/* ===================== PORTFOLIO ===================== */
function PortfolioAdmin() {
  type Item = Tables<"portfolio_items">;
  const empty = {
    title: "" as string | null,
    category: "bridal",
    image_url: "",
    before_url: "" as string | null,
    after_url: "" as string | null,
    sort_order: 0, is_published: true,
  };
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (file: File): Promise<string | null> => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP or GIF images are allowed");
      return null;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be 10MB or smaller");
      return null;
    }
    const extMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    setUploading(true);
    const ext = extMap[file.type];
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    setUploading(false);
    if (error) { toast.error(error.message); return null; }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.image_url) { toast.error("Image required"); return; }
    if (uploading) { toast.error("Please wait for upload to finish"); return; }
    const payload = { ...editing };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("portfolio_items").update(payload).eq("id", editing.id)
      : await supabase.from("portfolio_items").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ ...empty })} size="sm"><Plus className="w-4 h-4 mr-1" /> New Item</Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No portfolio items yet" /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <Card key={it.id} className="overflow-hidden group">
              <div className="aspect-square bg-muted relative">
                {it.image_url && <img src={it.image_url} alt={it.title ?? ""} className="w-full h-full object-cover" />}
                {!it.is_published && <Badge variant="secondary" className="absolute top-2 left-2">Draft</Badge>}
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium truncate">{it.title || "Untitled"}</p>
                <p className="text-xs text-muted-foreground capitalize">{it.category}</p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditing(it)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => remove(it.id)}>
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Item" : "New Item"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Title (optional)"><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
          <Field label="Category">
            <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bridal">Bridal</SelectItem>
                <SelectItem value="hd">HD</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="airbrush">Airbrush</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Image">
            {editing.image_url && <img src={editing.image_url} className="w-full max-w-xs rounded mb-2" alt="" />}
            <Input
              type="file" accept="image/*" disabled={uploading}
              onChange={async (e) => {
                const f = e.target.files?.[0]; if (!f) return;
                const url = await upload(f); if (url) setEditing({ ...editing, image_url: url });
              }}
            />
            <Input className="mt-1" placeholder="…or paste URL" value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order"><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <Field label="Published">
              <Select value={editing.is_published ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_published: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsAdmin() {
  type T = Tables<"testimonials">;
  const empty = {
    author_name: "",
    author_role: "" as string | null,
    quote: "", rating: 5,
    sort_order: 0, is_published: true,
  };
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
    if (error) toast.error(error.message); else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.author_name || !editing.quote) { toast.error("Name & quote required"); return; }
    const payload = { ...editing };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("testimonials").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ ...empty })} size="sm"><Plus className="w-4 h-4 mr-1" /> New Review</Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No reviews yet" /> : (
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.sort_order}</TableCell>
                  <TableCell className="font-medium">{t.author_name}<div className="text-xs text-muted-foreground">{t.author_role}</div></TableCell>
                  <TableCell>{"★".repeat(t.rating)}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm">{t.quote}</TableCell>
                  <TableCell><Badge variant={t.is_published ? "default" : "secondary"}>{t.is_published ? "Yes" : "No"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(t)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(t.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Review" : "New Review"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Author Name"><Input value={editing.author_name} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} /></Field>
          <Field label="Author Role (e.g. Bride)"><Input value={editing.author_role ?? ""} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} /></Field>
          <Field label="Quote"><Textarea rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Rating (1-5)"><Input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} /></Field>
            <Field label="Sort Order"><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <Field label="Published">
              <Select value={editing.is_published ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_published: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}

/* ===================== OFFERS ===================== */
function OffersAdmin() {
  type O = Tables<"offers">;
  const empty = {
    title: "",
    description: "" as string | null,
    badge: "" as string | null,
    image_url: "" as string | null,
    link_url: "" as string | null,
    expires_at: "" as string | null,
    is_active: true,
  };
  const [items, setItems] = useState<O[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.title) { toast.error("Title required"); return; }
    const payload = { ...editing, expires_at: editing.expires_at || null };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("offers").update(payload).eq("id", editing.id)
      : await supabase.from("offers").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ ...empty })} size="sm"><Plus className="w-4 h-4 mr-1" /> New Offer</Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No offers yet" /> : (
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.title}</TableCell>
                  <TableCell>{o.badge ?? "—"}</TableCell>
                  <TableCell className="text-xs">{o.expires_at ? new Date(o.expires_at).toLocaleDateString() : "—"}</TableCell>
                  <TableCell><Badge variant={o.is_active ? "default" : "secondary"}>{o.is_active ? "Yes" : "No"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditing({ ...o, expires_at: o.expires_at ?? "" })}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(o.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Offer" : "New Offer"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Title"><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
          <Field label="Badge (e.g. -20%)"><Input value={editing.badge ?? ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} /></Field>
          <Field label="Description"><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
          <Field label="Image URL"><Input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></Field>
          <Field label="Link URL"><Input value={editing.link_url ?? ""} onChange={(e) => setEditing({ ...editing, link_url: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expires At"><Input type="date" value={editing.expires_at?.slice(0, 10) ?? ""} onChange={(e) => setEditing({ ...editing, expires_at: e.target.value })} /></Field>
            <Field label="Active">
              <Select value={editing.is_active ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_active: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}

/* ===================== SHARED ===================== */
function LoadingBlock() {
  return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gold" /></div>;
}

/* ===================== HERO VIDEO ===================== */
function HeroVideoAdmin() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "hero_video_url")
      .maybeSingle()
      .then(({ data }) => {
        setUrl(data?.value ?? "");
        setLoading(false);
      });
  }, []);

  const upload = async (file: File) => {
    const allowed = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowed.includes(file.type)) {
      toast.error("Only MP4, WEBM or MOV videos are allowed");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video must be 100MB or smaller");
      return;
    }
    const extMap: Record<string, string> = {
      "video/mp4": "mp4",
      "video/webm": "webm",
      "video/quicktime": "mov",
    };
    setUploading(true);
    const ext = extMap[file.type];
    const path = `hero-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("hero-video").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    setUploading(false);
    if (error) { toast.error(error.message); return; }
    const { data } = supabase.storage.from("hero-video").getPublicUrl(path);
    setUrl(data.publicUrl);
    toast.success("Uploaded — click Save to publish");
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "hero_video_url", value: url }, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Hero video saved");
  };

  if (loading) return <LoadingBlock />;

  return (
    <Card className="p-6 space-y-4 max-w-2xl">
      <div>
        <h3 className="font-display text-xl mb-1">Homepage Hero Video</h3>
        <p className="text-xs text-muted-foreground">Upload an MP4 file or paste a direct video URL.</p>
      </div>
      <Field label="Upload video file (.mp4)">
        <Input
          type="file"
          accept="video/*"
          disabled={uploading}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
        />
        {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading…</p>}
      </Field>
      <Field label="…or paste video URL">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…/video.mp4" />
      </Field>
      {url && (
        <div className="aspect-video bg-ink rounded overflow-hidden">
          <video src={url} controls playsInline className="w-full h-full object-cover" />
        </div>
      )}
      <Button onClick={save} disabled={saving || uploading} className="w-full">
        {saving ? "Saving…" : "Save Hero Video"}
      </Button>
    </Card>
  );
}

/* ===================== REELS ===================== */
function ReelsAdmin() {
  type Reel = Tables<"reels">;
  const empty = { url: "", title: "" as string | null, sort_order: 0, is_active: true };
  const [items, setItems] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reels").select("*").order("sort_order");
    if (error) toast.error(error.message); else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    if (!editing.url) { toast.error("URL required"); return; }
    const payload = { ...editing };
    delete (payload as { id?: string }).id;
    const { error } = editing.id
      ? await supabase.from("reels").update(payload).eq("id", editing.id)
      : await supabase.from("reels").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this reel?")) return;
    const { error } = await supabase.from("reels").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">Add up to 3 active reels (Instagram reel URL or direct MP4). Shown on homepage below Instagram heading.</p>
        <Button onClick={() => setEditing({ ...empty })} size="sm"><Plus className="w-4 h-4 mr-1" /> New Reel</Button>
      </div>
      {loading ? <LoadingBlock /> : !items.length ? <EmptyBlock label="No reels yet" /> : (
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.sort_order}</TableCell>
                  <TableCell>{r.title || "—"}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate"><a href={r.url} target="_blank" rel="noreferrer" className="text-gold-dark hover:underline">{r.url}</a></TableCell>
                  <TableCell>{r.is_active ? <Badge>Live</Badge> : <Badge variant="secondary">Off</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(r)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      {editing && (
        <EditDrawer title={editing.id ? "Edit Reel" : "New Reel"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Reel URL (Instagram reel link or direct .mp4)">
            <Input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} placeholder="https://www.instagram.com/reel/XXXX/" />
          </Field>
          <Field label="Title (optional)">
            <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order"><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <Field label="Active">
              <Select value={editing.is_active ? "true" : "false"} onValueChange={(v) => setEditing({ ...editing, is_active: v === "true" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </EditDrawer>
      )}
    </div>
  );
}


function EmptyBlock({ label }: { label: string }) {
  return <Card className="p-12 text-center text-muted-foreground">{label}</Card>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
function EditDrawer({
  title, onClose, onSave, children,
}: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg bg-background h-full overflow-y-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="font-display text-xl">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
        {children}
        <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-background">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={onSave} className="flex-1">Save</Button>
        </div>
      </div>
    </div>
  );
}