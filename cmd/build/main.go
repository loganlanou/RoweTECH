// cmd/build/main.go - Static site generator
// Renders all Templ templates to static HTML files for Vercel deployment
package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/a-h/templ"

	"rowetech/internal/clerk"
	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"
	"rowetech/internal/database/models"
	"rowetech/templates/layouts"
	"rowetech/templates/pages"
)

func main() {
	outDir := "dist"
	if len(os.Args) > 1 {
		outDir = os.Args[1]
	}

	// Create output directory
	if err := os.MkdirAll(outDir, 0755); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create output directory: %v\n", err)
		os.Exit(1)
	}

	// Load configuration from environment
	cfg := config.Load()

	// Set up context with site metadata and Clerk config
	ctx := context.Background()
	ctx = context.WithValue(ctx, ctxkeys.SiteConfig, cfg.Site)
	ctx = context.WithValue(ctx, ctxkeys.ClerkConfig, clerk.FromConfig(cfg))

	fmt.Printf("Clerk enabled: %v\n", cfg.HasClerk())

	// Empty stats for static build
	emptyStats := layouts.AdminStats{}

	// Gallery items for static build (stock photos)
	galleryItems := getStaticGalleryItems()
	galleryCategories := getStaticGalleryCategories()

	// Define pages to generate
	staticPages := []struct {
		path      string
		component templ.Component
	}{
		{"/index.html", pages.Home()},
		{"/about/index.html", pages.About()},
		{"/services/index.html", pages.Services()},
		{"/capabilities/index.html", pages.Capabilities()},
		{"/contact/index.html", pages.Contact(false, "")},
		{"/gallery/index.html", pages.Gallery(galleryItems, galleryCategories)},
		{"/sign-in/index.html", pages.SignIn()},
		{"/sign-up/index.html", pages.SignUp()},
		{"/admin/index.html", pages.AdminDashboard(emptyStats)},
		{"/admin/gallery/index.html", pages.AdminGallery([]models.GalleryItem{}, []string{}, emptyStats)},
		{"/admin/contacts/index.html", pages.AdminContacts([]models.ContactSubmission{}, emptyStats, "")},
		{"/admin/users/index.html", pages.AdminUsers([]clerk.User{}, 0, emptyStats, cfg.HasClerk())},
		{"/admin/images/index.html", pages.AdminImages(map[string][]models.PageImage{}, []string{}, emptyStats)},
		{"/admin/settings/index.html", pages.AdminSettings(emptyStats)},
	}

	fmt.Printf("Building static site to %s/\n", outDir)

	for _, page := range staticPages {
		if err := renderPage(ctx, outDir, page.path, page.component); err != nil {
			fmt.Fprintf(os.Stderr, "Failed to render %s: %v\n", page.path, err)
			os.Exit(1)
		}
		fmt.Printf("  ✓ %s\n", page.path)
	}

	// Copy static assets
	if err := copyDir("static", filepath.Join(outDir, "static")); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to copy static assets: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("  ✓ /static/")

	fmt.Println("\nBuild complete!")
}

func renderPage(ctx context.Context, outDir, path string, component templ.Component) error {
	fullPath := filepath.Join(outDir, path)

	// Create directory if needed
	if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
		return err
	}

	// Create output file
	f, err := os.Create(fullPath)
	if err != nil {
		return err
	}
	defer f.Close()

	// Render template
	return component.Render(ctx, f)
}

func copyDir(src, dst string) error {
	return filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Calculate destination path
		relPath, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		dstPath := filepath.Join(dst, relPath)

		if info.IsDir() {
			return os.MkdirAll(dstPath, 0755)
		}

		// Copy file
		return copyFile(path, dstPath)
	})
}

func copyFile(src, dst string) error {
	srcFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	dstFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer dstFile.Close()

	_, err = io.Copy(dstFile, srcFile)
	return err
}

// getStaticGalleryItems returns hardcoded gallery items for static build
func getStaticGalleryItems() []models.GalleryItem {
	return []models.GalleryItem{
		// Original items
		{ID: 1, Title: "CNC Milling Operation", Category: "CNC Machining", Description: "Precision 5-axis CNC milling for complex geometries", ImageUrl: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80", SortOrder: 1, IsFeatured: true},
		{ID: 2, Title: "Laser Cutting", Category: "Laser", Description: "High-precision laser cutting and engraving", ImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", SortOrder: 2, IsFeatured: false},
		{ID: 3, Title: "Welding & Fabrication", Category: "Welding", Description: "Professional TIG and MIG welding services", ImageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", SortOrder: 3, IsFeatured: false},
		{ID: 4, Title: "3D Printing", Category: "3D Printing", Description: "Rapid prototyping with industrial FDM and SLA", ImageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80", SortOrder: 4, IsFeatured: false},
		{ID: 5, Title: "CNC Lathe Work", Category: "CNC Machining", Description: "Precision turning for cylindrical components", ImageUrl: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80", SortOrder: 5, IsFeatured: false},
		{ID: 6, Title: "Plasma Cutting", Category: "Plasma", Description: "Heavy-duty plasma cutting for thick materials", ImageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", SortOrder: 6, IsFeatured: false},
		{ID: 7, Title: "Metal Fabrication", Category: "Welding", Description: "Custom metal fabrication and assembly", ImageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", SortOrder: 7, IsFeatured: false},
		{ID: 8, Title: "Industrial Automation", Category: "EOAT", Description: "End-of-arm tooling for robotics", ImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", SortOrder: 8, IsFeatured: false},
		{ID: 9, Title: "Precision Grinding", Category: "CNC Machining", Description: "Surface grinding to tight tolerances", ImageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", SortOrder: 9, IsFeatured: false},
		{ID: 10, Title: "Mold Components", Category: "Mold Repair", Description: "Precision mold inserts and components", ImageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", SortOrder: 10, IsFeatured: false},
		{ID: 11, Title: "Laser Engraving", Category: "Laser", Description: "Detailed marking and engraving services", ImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", SortOrder: 11, IsFeatured: false},
		{ID: 12, Title: "Prototyping", Category: "3D Printing", Description: "Fast turnaround prototype development", ImageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80", SortOrder: 12, IsFeatured: false},
		// Additional items
		{ID: 13, Title: "Injection Mold Repair", Category: "Mold Repair", Description: "Complete restoration of damaged injection molds to original specifications", ImageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", SortOrder: 13, IsFeatured: true},
		{ID: 14, Title: "Mold Polishing", Category: "Mold Repair", Description: "Mirror finish polishing for improved part quality", ImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", SortOrder: 14, IsFeatured: false},
		{ID: 15, Title: "Mold Welding Repair", Category: "Mold Repair", Description: "Precision TIG welding for mold surface restoration", ImageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", SortOrder: 15, IsFeatured: false},
		{ID: 16, Title: "Assembly Fixture", Category: "Fixtures", Description: "Custom assembly fixtures for production efficiency", ImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", SortOrder: 16, IsFeatured: true},
		{ID: 17, Title: "Welding Fixture", Category: "Fixtures", Description: "Precision welding fixtures for consistent part alignment", ImageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", SortOrder: 17, IsFeatured: false},
		{ID: 18, Title: "Inspection Fixture", Category: "Fixtures", Description: "Quality control fixtures for dimensional verification", ImageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", SortOrder: 18, IsFeatured: false},
		{ID: 19, Title: "Machining Fixture", Category: "Fixtures", Description: "Work-holding fixtures for CNC operations", ImageUrl: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80", SortOrder: 19, IsFeatured: false},
		{ID: 20, Title: "Robot Gripper", Category: "EOAT", Description: "Custom end-of-arm gripper for automated handling", ImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", SortOrder: 20, IsFeatured: true},
		{ID: 21, Title: "Vacuum End Effector", Category: "EOAT", Description: "Suction cup tooling for sheet material handling", ImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", SortOrder: 21, IsFeatured: false},
		{ID: 22, Title: "Multi-Part Gripper", Category: "EOAT", Description: "Complex gripper systems for multiple part pickup", ImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", SortOrder: 22, IsFeatured: false},
		{ID: 23, Title: "5-Axis Machining", Category: "CNC Machining", Description: "Complex geometry machining with 5-axis capability", ImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", SortOrder: 23, IsFeatured: false},
		{ID: 24, Title: "Aluminum Machining", Category: "CNC Machining", Description: "High-speed machining of aluminum components", ImageUrl: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80", SortOrder: 24, IsFeatured: false},
		{ID: 25, Title: "Steel Machining", Category: "CNC Machining", Description: "Heavy-duty machining of steel and tool steel", ImageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", SortOrder: 25, IsFeatured: false},
		{ID: 26, Title: "Precision Boring", Category: "CNC Machining", Description: "Tight tolerance boring operations", ImageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80", SortOrder: 26, IsFeatured: false},
		{ID: 27, Title: "Quality Inspection", Category: "Quality", Description: "CMM and dimensional inspection services", ImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", SortOrder: 27, IsFeatured: false},
		{ID: 28, Title: "Surface Finishing", Category: "Finishing", Description: "Bead blasting and surface treatment", ImageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", SortOrder: 28, IsFeatured: false},
		{ID: 29, Title: "Assembly Services", Category: "Assembly", Description: "Complete mechanical assembly and testing", ImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", SortOrder: 29, IsFeatured: false},
		{ID: 30, Title: "EDM Services", Category: "EDM", Description: "Wire and sinker EDM for complex shapes", ImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", SortOrder: 30, IsFeatured: false},
	}
}

// getStaticGalleryCategories returns all unique categories
func getStaticGalleryCategories() []string {
	return []string{
		"CNC Machining",
		"Mold Repair",
		"Fixtures",
		"EOAT",
		"Laser",
		"Welding",
		"3D Printing",
		"Plasma",
		"Quality",
		"Finishing",
		"Assembly",
		"EDM",
	}
}
// Force redeploy Fri Jan 23 11:01:32 AM CST 2026
