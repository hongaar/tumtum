<div align="center">
  <h1 id="tumtum">
    tumtum
  </h1>
  <p>
    <a href="https://www.npmjs.com/package/@tumtum/sdk">
      <img src="https://img.shields.io/npm/v/@tumtum/sdk" alt="npm">
    </a>
    <a href="https://github.com/tumtum-installer/sdk/actions?query=workflow%3Abuild">
      <img src="https://img.shields.io/github/workflow/status/tumtum-installer/sdk/build" alt="Build Status">
    </a>
  </p>
  <p>
    <strong>
      Cross-platform package manager for microservice apps
    </strong>
  </p>
  <p>
    <img src="https://live.staticflickr.com/3935/15633434771_f86dd02dda_w_d.jpg" alt="So rested he by the Tumtum tree, And stood awhile in thought." title="Tumtum Tree"><br>
    <small>
      So rested he by the Tumtum tree,<br>
      And stood awhile in thought.<br>
      <em>
        <a href="https://www.flickr.com/photos/artofthemystic/15633434771">
          photo by Martin Wallnberger
        </a>
      </em>
    </small>
  </p>
  <hr>
  <p>
    Tumtum is a framework for distributing and managing<br>
    cross-platform, language agnostic microservice-based software.<br>
    It runs on NodeJS and it&#39;s built in TypeScript.
  </p>
  <hr>
</div>

# Introduction

Tumtum is a framework for managing microservice-based software and it offers the
following features:

- Creating and publishing component artefacts
- Manages component artefacts in a cloud storage backend (currently only S3)
- Installs (a subset of available) components on a host
- Installs component binaries as native OS services
- Manages user files
- Upgrades, reset and uninstalls components
- Creates and restores backups
- Installs services from arbitrary (e.g. project/epic/release) channels
- Integrates with PM tools (currently Jira and Linear) to detect projects/epics
- Create native, self-extracting installers
- Automatically release issues and create release notes
- Installs services from local artefacts for dev/test purposes
- Run component acceptance tests

# Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [CLI generator](#cli-generator)
- [Concepts](#concepts)
- [Development guide](#development-guide)
  - [Directory structure](#directory-structure)
  - [Style guide](#style-guide)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting started

The Tumtum framework has two major components: an API and a CLI generator
(which uses the API internally).

Most users only use the CLI generator. The generator can product three different
types of CLI binaries. Custom types of CLI binaries can be created using the
API.

## CLI generator

...

# Concepts

# Development guide

You'll need a recent version of Node (12 or higher).
