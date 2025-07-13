import { Request, Response } from "express";
import dotenv from "dotenv";
import { Profile } from "../models/Profile";
import { User } from "../models/Users";
import request from "request";

dotenv.config();

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  email: string | null;
}

interface Profilefields {
  user?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  status?: string;
  githubusername?: string;
  skills?: string;
  socials?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ message: "No Profile Found!" });
      return;
    }

    res.json(profile);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postProfile = async (req: Request, res: Response) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    socials,
  } = req.body;

  const profileFields: Profilefields = {};
  profileFields.user = req.user?.id;
  if (company) profileFields.company = company;
  if (website !== undefined) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.map((skill: string) => skill.trim());
  }
  profileFields.socials = {};
  if (socials?.youtube) profileFields.socials.youtube = socials.youtube;
  if (socials?.facebook) profileFields.socials.facebook = socials.facebook;
  if (socials?.twitter) profileFields.socials.twitter = socials.twitter;
  if (socials?.linkedin) profileFields.socials.linkedin = socials.linkedin;
  if (socials?.instagram) profileFields.socials.instagram = socials.instagram;
  try {
    let profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: (req.user as { id: string }).id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
      return;
    }
    profile = await new Profile(profileFields);
    await profile.save();

    res.json(profile);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ message: "Profile not Found" });
      return;
    }
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const delProfile = async (req: Request, res: Response) => {
  try {
    await Profile.findOneAndDelete({ user: (req.user as { id: string }).id });
    await User.findOneAndDelete({ _id: (req.user as { id: string }).id });
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const delWholeProfile = async (req: Request, res: Response) => {
  try {
    await Profile.findOneAndDelete({ user: (req.user as { id: string }).id });

    await User.findOneAndDelete({ _id: (req.user as { id: string }).id });

    res.json({ msg: "User and profile deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const addExp = async (req: Request, res: Response) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    });
    profile?.experience.unshift(newExp);
    await profile?.save();
    res.status(200).json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const delExp = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    });
    const removeIndex = profile?.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (typeof removeIndex === "number") {
      profile?.experience.splice(removeIndex, 1);
    }
    await profile?.save();
    res.status(200).json(profile);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addEdu = async (req: Request, res: Response) => {
  const { institute, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    institute,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    });
    profile?.education.unshift(newEdu);
    await profile?.save();
    res.status(200).json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const delEdu = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: (req.user as { id: string }).id,
    });
    if (profile && profile.education) {
      profile.education = profile.education.filter(
        (edu) => String(edu._id) !== req.params.edu_id
      );
      await profile.save();
      res.status(200).json(profile);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const githubCallBack = async (req: Request, res: Response) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).json({ message: "No code provided" });
    return;
  }

  try {
    const tokenRes = await axios.post<GitHubTokenResponse>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.githubClientId,
        client_secret: process.env.githubClientSecret,
        code: code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get<GitHubUser>("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    const username = userRes.data.login;
    return res.redirect(`/profile/github/${username}`);
  } catch (error: any) {
    console.error("GitHub OAuth Error:", error.message);
    return res.status(500).json({ message: "GitHub OAuth failed" });
  }
};

export const getGithubInfo = async (req: Request, res: Response) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ message: "Profile Not forund!" });
        return;
      }

      res.json(JSON.parse(body));
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
