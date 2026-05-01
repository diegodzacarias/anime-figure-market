import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ApisPage = () => {
    const [form, setForm] = useState({
        franchiseId: "3",
        brandId: "1",
        name: "",
        slug: "",
        scene: "",
        lineName: "",
        material: "",
        isLicensed: "true",
        editionSize: "",
        basePrice: "",
        baseCurrencyCode: "USD",
        basePreorderDate: "",
        baseEstimatedReleaseDate: "",
        actualReleaseDate: "",
        status: "RELEASED",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const buildPayload = () => ({
        franchiseId: Number(form.franchiseId),
        brandId: Number(form.brandId),
        name: form.name,
        slug: form.slug,
        scene: form.scene || null,
        lineName: form.lineName || null,
        material: form.material || null,
        isLicensed: form.isLicensed === "true",
        editionSize: form.editionSize ? Number(form.editionSize) : null,
        basePrice: form.basePrice ? Number(form.basePrice) : null,
        baseCurrencyCode: form.baseCurrencyCode,
        basePreorderDate: form.basePreorderDate || null,
        baseEstimatedReleaseDate: form.baseEstimatedReleaseDate || null,
        actualReleaseDate: form.actualReleaseDate || null,
        status: form.status,
        notes: form.notes || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = buildPayload();
        console.log("Payload:", payload);
        alert("Payload generado. Revisa consola.");
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold">APIs</h1>

            <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-5 border p-6 rounded-lg"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Franchise */}
                    <div>
                        <label>Franchise</label>
                        <select
                            name="franchiseId"
                            value={form.franchiseId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="1">Naruto</option>
                            <option value="2">One Piece</option>
                            <option value="3">Berserk</option>
                        </select>
                    </div>

                    {/* Brand */}
                    <div>
                        <label>Brand</label>
                        <select
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="1">Good Smile Company</option>
                            <option value="2">Kotobukiya</option>
                            <option value="3">MegaHouse</option>
                            <option value="4">Prime 1</option>
                            <option value="5">FREEing</option>
                        </select>
                    </div>

                    <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                    <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
                    <Input name="scene" placeholder="Scene" value={form.scene} onChange={handleChange} />
                    <Input name="lineName" placeholder="Line Name" value={form.lineName} onChange={handleChange} />
                    <Input name="material" placeholder="Material" value={form.material} onChange={handleChange} />

                    <Input name="editionSize" type="number" placeholder="Edition Size" value={form.editionSize} onChange={handleChange} />
                    <Input name="basePrice" type="number" step="0.01" placeholder="Base Price" value={form.basePrice} onChange={handleChange} />

                    {/* Currency */}
                    <div>
                        <label>Currency</label>
                        <select
                            name="baseCurrencyCode"
                            value={form.baseCurrencyCode}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="USD">USD</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>

                    {/* Licensed */}
                    <div>
                        <label>Licensed</label>
                        <select
                            name="isLicensed"
                            value={form.isLicensed}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label>Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="PREORDER">PREORDER</option>
                            <option value="RELEASED">RELEASED</option>
                            <option value="SOLD_OUT">SOLD_OUT</option>
                        </select>
                    </div>

                    {/* FECHAS CON CALENDARIO NATIVO */}
                    <div>
                        <label>Base Preorder Date</label>
                        <input
                            type="date"
                            name="basePreorderDate"
                            value={form.basePreorderDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Base Estimated Release Date</label>
                        <input
                            type="date"
                            name="baseEstimatedReleaseDate"
                            value={form.baseEstimatedReleaseDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Actual Release Date</label>
                        <input
                            type="date"
                            name="actualReleaseDate"
                            value={form.actualReleaseDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                {/* Notes */}
                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <Button type="submit">Generate Payload</Button>
            </form>
        </div>
    );
};

export default ApisPage;