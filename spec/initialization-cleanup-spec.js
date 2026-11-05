describe("Git Chunk initialization cleanup", () => {
  it("unloads an initial bootstrap before diff views and marker maps have activated", async () => {
    const pack = lumine.packages.loadPackage("git-chunk");
    pack.requireMainModule();
    pack.initializeForExternalUse("initial package bootstrap");
    const context = pack.lifecycleContext;
    expect(pack.mainInitialized).toBe(true);
    expect(pack.mainActivated).toBe(false);

    await lumine.packages.unloadPackage("git-chunk", { serialize: false });

    expect(context.subscriptions.disposed).toBe(true);
    expect(lumine.packages.isPackageLoaded("git-chunk")).toBe(false);
  });
});
