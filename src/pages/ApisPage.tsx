import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

const FIGURES_ENDPOINT = `${API_BASE_URL}/v1/figures`;

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
        name: form.name.trim(),
        slug: form.slug.trim(),
        scene: form.scene.trim() || null,
        lineName: form.lineName.trim() || null,
        material: form.material.trim() || null,
        isLicensed: form.isLicensed === "true",
        editionSize: form.editionSize ? Number(form.editionSize) : null,
        basePrice: form.basePrice ? Number(form.basePrice) : null,
        baseCurrencyCode: form.baseCurrencyCode,
        basePreorderDate: form.basePreorderDate || null,
        baseEstimatedReleaseDate: form.baseEstimatedReleaseDate || null,
        actualReleaseDate: form.actualReleaseDate || null,
        status: form.status,
        notes: form.notes.trim() || null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = buildPayload();

        console.log("Payload:", payload);

        try {
            const response = await fetch(FIGURES_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend error:", errorText);
                alert("Error sending figure. Check console.");
                return;
            }

            alert("Figure sent successfully.");
        } catch (error) {
            console.error("Request error:", error);
            alert("Error connecting to backend. Check console.");
        }
    };

    const selectClass =
        "w-full border border-input bg-background text-foreground p-2 rounded";

    const optionClass = "bg-background text-foreground";

    const dateInputClass =
        "w-full border border-input bg-background text-foreground p-2 rounded";

    return (
        <div className="container py-10">
            <div className="mb-4">
                <Link to="/">
                    <Button variant="outline">← Volver al inicio</Button>
                </Link>
            </div>

            <h1 className="text-3xl font-bold">APIs</h1>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5 border p-6 rounded-lg">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label>Franchise</label>
                        <select
                            name="franchiseId"
                            value={form.franchiseId}
                            onChange={handleChange}
                            className={selectClass}
                            required
                        >
                            <option className={optionClass} value="1">Naruto</option>
                            <option className={optionClass} value="2">One Piece</option>
                            <option className={optionClass} value="3">Berserk</option>
                        </select>
                    </div>

                    <div>
                        <label>Brand</label>
                        <select
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                            className={selectClass}
                            required
                        >
                            <option className={optionClass} value="1">Good Smile Company</option>
                            <option className={optionClass} value="2">Kotobukiya</option>
                            <option className={optionClass} value="3">MegaHouse</option>
                            <option className={optionClass} value="4">Prime 1</option>
                            <option className={optionClass} value="5">FREEing</option>
                        </select>
                    </div>

                    <Input name="name" placeholder="Name" maxLength={255} value={form.name} onChange={handleChange} required />
                    <Input name="slug" placeholder="Slug" maxLength={300} value={form.slug} onChange={handleChange} required />
                    <Input name="scene" placeholder="Scene" maxLength={255} value={form.scene} onChange={handleChange} />
                    <Input name="lineName" placeholder="Line Name" maxLength={150} value={form.lineName} onChange={handleChange} />
                    <Input name="material" placeholder="Material" maxLength={100} value={form.material} onChange={handleChange} />

                    <Input
                        name="editionSize"
                        type="number"
                        min="0"
                        placeholder="Edition Size"
                        value={form.editionSize}
                        onChange={handleChange}
                    />

                    <Input
                        name="basePrice"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="Base Price"
                        value={form.basePrice}
                        onChange={handleChange}
                    />

                    <div>
                        <label>Currency</label>
                        <select
                            name="baseCurrencyCode"
                            value={form.baseCurrencyCode}
                            onChange={handleChange}
                            className={selectClass}
                            required
                        >
                            <option className={optionClass} value="USD">USD</option>
                            <option className={optionClass} value="JPY">JPY</option>
                        </select>
                    </div>

                    <div>
                        <label>Licensed</label>
                        <select
                            name="isLicensed"
                            value={form.isLicensed}
                            onChange={handleChange}
                            className={selectClass}
                            required
                        >
                            <option className={optionClass} value="true">Yes</option>
                            <option className={optionClass} value="false">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className={selectClass}
                            required
                        >
                            <option className={optionClass} value="PREORDER">PREORDER</option>
                            <option className={optionClass} value="RELEASED">RELEASED</option>
                            <option className={optionClass} value="SOLD_OUT">SOLD_OUT</option>
                        </select>
                    </div>

                    <div>
                        <label>Base Preorder Date</label>
                        <input
                            type="date"
                            name="basePreorderDate"
                            value={form.basePreorderDate}
                            onChange={handleChange}
                            className={dateInputClass}
                        />
                    </div>

                    <div>
                        <label>Base Estimated Release Date</label>
                        <input
                            type="date"
                            name="baseEstimatedReleaseDate"
                            value={form.baseEstimatedReleaseDate}
                            onChange={handleChange}
                            className={dateInputClass}
                        />
                    </div>

                    <div>
                        <label>Actual Release Date</label>
                        <input
                            type="date"
                            name="actualReleaseDate"
                            value={form.actualReleaseDate}
                            onChange={handleChange}
                            className={dateInputClass}
                        />
                    </div>
                </div>

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="border border-input bg-background text-foreground p-3 rounded"
                />

                <Button type="submit">Send Figure</Button>
            </form>
        </div>
    );
};

export default ApisPage;